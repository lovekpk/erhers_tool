//根据获取Logs的方法  来监听鲸鱼钱包的最新动向  目前只实现Transfer

import { ethers } from "ethers";
import {BigNumber} from "bignumber.js";

// 准备 alchemy API 
const ALCHEMY_MAINNET_URL = 'wss://eth-goerli.g.alchemy.com/v2/6EZHaaGlVxcmCdyCntroYwiznC2PsOSr';
// 连接主网 provider
const provider = new ethers.providers.WebSocketProvider(ALCHEMY_MAINNET_URL);

// token的合约地址
const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';//FLIP
const walletAddress = '0x5f4d2752d5d18171A04Eaf4445a8A0c4922971ad';

const filter = {
  address: contractAddress,
  fromBlock: 8618518,
  toBlock: 'latest',
  topics: [
    ethers.utils.id("Transfer(address,address,uint256)"),
    [ethers.utils.hexZeroPad(walletAddress.toLocaleLowerCase(), 32)]
  ]
};


const main = async () => {

  // const logs = await provider.getLogs(filter);
  // console.log(`收到新交易：${JSON.stringify(logs)}`);

  provider.getLogs(filter).then((logs) =>{
    console.log(`返回的Logs组：`,logs);
    for(const log of logs){
      console.log(`返回的Log：`,log);
      // const paresLog = iface.parseLog(log);
      console.log(`收到新交易合约：`,log.address);
      const topics = log.topics; // 获取topics数据
      console.log(`新交易from：`,ethers.utils.hexStripZeros(topics[1]));
      console.log(`新交易to：`,ethers.utils.hexStripZeros(topics[2]));
      const hexString = ethers.utils.hexStripZeros(log.data);
      console.log(hexString);
      const balanceInWei = new BigNumber(hexString).dividedBy(1e18);//使用bignumber.js库
      console.log(balanceInWei.toFixed(3));


      // const bigNumber = ethers.BigNumber.from(hexString);
      // const stringValue = bigNumber.toString();  // 转为10进制字符串
      // const decimalNumber = ethers.utils.parseUnits(stringValue,0);
      // const c = decimalNumber.div(BigNumber.from("1000000000000000000"));
      // const balanceInEther = parseFloat(c).toFixed(3);
      // console.log(balanceInEther);
      // const c = decimalNumber.div(BigNumber.from("1000000000000000000"));
      // console.log(c.toString());
      // const a = c.div(BigNumber.from("1000000000000000000"));
      // console.log(a.toString());

      
    }
  });
  
}

main();