// 0x76346faC442F153ED8691fF88b1297643260d8a0
import { ethers, utils } from 'ethers'
import { newFromString, validateAddressString } from '@glif/filecoin-address'
import registrarAbi from './abi/registrar.abi.json'
import registryAbi from './abi/registry.abi.json'
import registrarControllerAbi from './abi/registrar.controller.abi.json'
import reverseRegistrarAbi from './abi/reverse.registrar.abi.json'
import publicResolverAbi from './abi/public.resolver.abi.json'
const rpcUrl = 'https://filfox.info/rpc/v1'
const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

const registryContract = new ethers.Contract(
  '0x889d4f6667ab1aa0a77bc8befbfc9dca5d6ead3d',
  registryAbi,
  provider
)

const registryControllerContract = new ethers.Contract(
  '0x12aea3f77ae98b33f27f20825b15e4ab8b381684',
  registrarControllerAbi,
  provider
)

const registarContract = new ethers.Contract(
  '0xf87d4c3c91555fecfe684fa58dd26a817c75892b',
  registrarAbi,
  provider
)

const reverseRegistarContract = new ethers.Contract(
  '0x7b053507c2e0f9be1632c4b17c2e871c1770cb14',
  reverseRegistrarAbi,
  provider
)

const publicResolverContract = new ethers.Contract(
  '0xe2c015abb52e22227354f78297f0c2de3807b311',
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
    resolveAddress
  }
}

export function isFilAddress(address) {
  return validateAddressString(address)
}
