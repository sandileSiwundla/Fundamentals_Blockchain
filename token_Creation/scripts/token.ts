import { network } from "hardhat";

const { viem, networkName } = await network.create();
const client = await viem.getPublicClient();

console.log(`Deploying Token to ${networkName}...`);

const token = await viem.deployContract("Token");

console.log("Token address:", token.address);


console.log("Deployment successful!");