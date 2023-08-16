import { ethers, utils } from 'ethers'
import { newFromString, validateAddressString } from '@glif/filecoin-address'
import { RPC, FNS_CONTRACT_ADDRESS } from '@/filecoin/filecoin.config'
import registrarAbi from './abi/registrar.abi.json'
import registryAbi from './abi/registry.abi.json'
import registrarControllerAbi from './abi/registrar.controller.abi.json'
import reverseRegistrarAbi from './abi/reverse.registrar.abi.json'
import publicResolverAbi from './abi/public.resolver.abi.json'

const provider = new ethers.providers.JsonRpcProvider(RPC)

const registryContract = new ethers.Contract(
  FNS_CONTRACT_ADDRESS.FNSRegistry,
  registryAbi,
  provider
)

const registryControllerContract = new ethers.Contract(
  FNS_CONTRACT_ADDRESS.RegistrarController,
  registrarControllerAbi,
  provider
)

const registarContract = new ethers.Contract(
  FNS_CONTRACT_ADDRESS.Registrar,
  registrarAbi,
  provider
)

const reverseRegistarContract = new ethers.Contract(
  FNS_CONTRACT_ADDRESS.ReverseRegistrar,
  reverseRegistrarAbi,
  provider
)

const publicResolverContract = new ethers.Contract(
  FNS_CONTRACT_ADDRESS.PublicResolver,
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
