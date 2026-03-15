"use client"

import { useState } from "react"

export default function Home() {

  const [usd, setUsd] = useState(1000)

  const rate = 17
  const fee = 0.01

  const mxn = usd * rate
  const feeAmount = mxn * fee
  const finalAmount = mxn - feeAmount

  return (
    <main style={{fontFamily:"Arial", padding:"40px"}}>

      <h1 style={{fontSize:"40px", marginBottom:"20px"}}>
        USDC → MXN Liquidity Desk
      </h1>

      <p style={{marginBottom:"30px"}}>
        Convert USDC / USDT / USD to Mexican Pesos via SPEI in minutes.
      </p>

      <div style={{
        border:"1px solid #ddd",
        padding:"30px",
        borderRadius:"10px",
        maxWidth:"500px"
      }}>

        <h2>Conversion Calculator</h2>

        <p>Enter amount in USDC</p>

        <input
          type="number"
          value={usd}
          onChange={(e)=>setUsd(Number(e.target.value))}
          style={{
            padding:"10px",
            fontSize:"18px",
            width:"100%",
            marginBottom:"20px"
          }}
        />

        <p>Exchange rate: 1 USD = {rate} MXN</p>

        <p>MXN before fee: {mxn.toFixed(2)}</p>

        <p>Fee (1%): {feeAmount.toFixed(2)} MXN</p>

        <h3>You receive: {finalAmount.toFixed(2)} MXN</h3>

      </div>

      <div style={{marginTop:"40px"}}>

        <h2>How it works</h2>

        <ol>
          <li>Send USDC</li>
          <li>Get instant quote</li>
          <li>Receive MXN via SPEI</li>
        </ol>

      </div>

    </main>
  )
}