// 0x76346faC442F153ED8691fF88b1297643260d8a0
import { ethers, utils } from 'ethers'
import { newFromString, validateAddressString } from '@glif/filecoin-address'
import { RPC } from '@/filecoin/filecoin.config'
import registrarAbi from './abi/registrar.abi.json'
import registryAbi from './abi/registry.abi.json'
import registrarControllerAbi from './abi/registrar.controller.abi.json'
import reverseRegistrarAbi from './abi/reverse.registrar.abi.json'
import publicResolverAbi from './abi/public.resolver.abi.json'

const provider = new ethers.providers.JsonRpcProvider(RPC)

const registryContract = new ethers.Contract(
  '0x0381f0c42f542DEcEBC3ea1A27B3eF4ac1F258b6',
  registryAbi,
  provider
)

const registryControllerContract = new ethers.Contract(
  '0xc5b7f7f5dFB7f16F74476564Fe2e3B5a7C182Cd4',
  registrarControllerAbi,
  provider
)

const registarContract = new ethers.Contract(
  '0x392d1959CFbdCA10342e7D32BCeF87e2Ac25221e',
  registrarAbi,
  provider
)

const reverseRegistarContract = new ethers.Contract(
  '0xc2ef6a6dd61529325290894fDC02F7dD3B7D7275',
  reverseRegistrarAbi,
  provider
)

const publicResolverContract = new ethers.Contract(
  '0x7EEa7D977fff536d9B8752a5dF24A00E288c1B43',
  publicResolverAbi,
  provider
)

export const transAddress = address => {
  const addressFormat = newFromString(address)
  return `0x${addressFormat.subAddrHex}`
}

export async function getDomaisByAddress(address) {
  if (!address.startsWith('0x')) {
    address = transAddress(address)
  }
  const length = (await registarContract.balanceOf(address)).toNumber()
  const promiseList = []
  for (let i = 0; i < length; i++) {
    promiseList.push(getDomainInfoByAddress(address, i))
  }
  const names = await Promise.all(promiseList)
  const reverseNode = await reverseRegistarContract.node(address)
  const reverseRecord = await publicResolverContract.name(reverseNode)
  return {
    address,
    names,
    reverseRecord
  }
}

async function getDomainInfoByAddress(address, index) {
  const tokenId = await registarContract.tokenOfOwnerByIndex(address, index)
  const name = await registarContract.nameOf(tokenId)
  const expiration = await registarContract.nameExpires(tokenId)
  return {
    address,
    name: `${name}.fil`,
    expiration: expiration.toNumber()
  }
}

export async function getAddressByDomain(domain) {
  const namehash = utils.namehash(domain)
  const name = domain.replace(/\.fil$/, '')
  const [controller, registrant, expiration, resolveAddress] = await Promise.all([
    registryContract.owner(namehash),
    registarContract.ownerOf(utils.keccak256(utils.toUtf8Bytes(name))),
    registryControllerContract.nameExpires(name),
    publicResolverContract['addr(bytes32,uint256)'](namehash, 461)
  ])
  return {
    name: domain,
    controller,
    registrant,
    expiration: expiration.toNumber(),
    resolveAddress: utils.toUtf8String(resolveAddress)
  }
}

export function isFilAddress(address) {
  return validateAddressString(address)
}
