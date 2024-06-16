import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { useDispatch } from 'react-redux'
import { newSymbol } from './utils/symbol'
const Markets = () => {
    const dispatch =useDispatch()
    const [finanacilaModelData, setFinancilModelData] = useState("")
    const handlesymbol = (symbol) => {
        console.log(symbol)
        dispatch(newSymbol(symbol))
    }
    useEffect(() => {
        const getMarketData = async () => {
            try {
                const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/GOLD,BTC,WTI,AXP,SP,AAPL,IBM,PRAA,PAAS,LVCLY,CRM,WMT,NKE,CAT?apikey=lEVb2rS9IMlYL8RyYaRDPwZx4r5GmRTj`)
                const json = await response.json()

                // console.log(json)
                if (!response.ok) {
                    console.error("Error fetching data from api")
                }
                else {
                    setFinancilModelData(json)
                }

            } catch (error) {
                console.error(error)
            }
        }
        getMarketData()
    }, [])
    const getTextColor = (percentage) => {
        let strPercentage = String(percentage)
        if (strPercentage.startsWith('+')) {
            return 'text-green-500';
        } else if (strPercentage.startsWith('-')) {
            return 'text-red-600';
        } else {
            return 'text-green-500';
        }
    };
    return finanacilaModelData.length < 10 ? <Loading /> : (
        <div className='bg-black  rounded-lg mt-10 p-8 m-5 w-[450px]'  >
            <div className='flex flex-row my-1 '>
                <h1 className='font-medium w-1/4'>Markets</h1>
                <h1 className='font-medium w-1/4 text-center'>Price</h1>
                <h1 className='w-1/4 text-center'>Changes</h1>
                <span className='w-1/4 text-right'>% Changes</span>
            </div>
            <div className='mt-7'>
                {finanacilaModelData.map((financialModelData) => (
                    <div
                        key={financialModelData.symbol}
                        className='flex flex-row my-1 cursor-pointer'
                        onClick={() => handlesymbol(financialModelData.symbol)}
                    >
                        <h1 className='font-medium w-1/4'>{financialModelData.symbol}</h1>
                        <h1 className='w-1/4 text-center'>{financialModelData.price}</h1>
                        <h1 className='w-1/4 text-center'>{financialModelData.change}</h1>
                        <span className={`w-1/4 text-right ${getTextColor(financialModelData.changesPercentage)}`}>
                            {financialModelData.changesPercentage}
                        </span>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Markets