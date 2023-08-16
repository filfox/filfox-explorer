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
  '0x916915d0d41EaA8AAEd70b2A5Fb006FFc213961b',
  registryAbi,
  provider
)

const registryControllerContract = new ethers.Contract(
  '0xDA3c407a23Ef96930f1A07903fB8360D8926991E',
  registrarControllerAbi,
  provider
)

const registarContract = new ethers.Contract(
  '0x45d9d6408d5159a379924cf423cb7e15C00fA81f',
  registrarAbi,
  provider
)

const reverseRegistarContract = new ethers.Contract(
  '0xc49833d827b01e1465c65221A59885Fb71614a26',
  reverseRegistrarAbi,
  provider
)

const publicResolverContract = new ethers.Contract(
  '0xed9bd04b1BB87Abe2EfF583A977514940c95699c',
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
