"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Home() {

  const [lang,setLang] = useState("EN")
  const [usd,setUsd] = useState(5000)
  const [rate,setRate] = useState(17)

  useEffect(()=>{

    async function loadRate(){

      try{
        const res = await fetch("https://open.er-api.com/v6/latest/USD")
        const data = await res.json()

        if(data?.rates?.MXN){
          setRate(data.rates.MXN)
        }

      }catch(e){}
    }

    loadRate()

  },[])

  const gross = usd * rate
  const fee = gross * 0.01
  const final = gross - fee

  const t = {

    EN:{
      heroTitle:"Liquidity Rail for the Pond0x Community",
      heroSub:"Convert USDC / USDT into MXN via SPEI in minutes.",
      calculator:"Conversion Calculator",
      amount:"Amount USDC",
      gross:"Gross Conversion",
      fee:"Estimated Fee",
      net:"Estimated MXN Received",
      how:"How it works",
      step1:"Send USDC / USDT",
      step1text:"User deposits stablecoins.",
      step2:"Conversion",
      step2text:"Liquidity desk converts to MXN.",
      step3:"Receive MXN",
      step3text:"Funds delivered via SPEI.",
      cta:"Request Quote"
    },

    ES:{
      heroTitle:"Rail de Liquidez para la Comunidad Pond0x",
      heroSub:"Convierte USDC / USDT a MXN vía SPEI en minutos.",
      calculator:"Calculadora de Conversión",
      amount:"Monto en USDC",
      gross:"Conversión Bruta",
      fee:"Comisión Estimada",
      net:"MXN Recibido",
      how:"Cómo funciona",
      step1:"Envías USDC / USDT",
      step1text:"El usuario envía stablecoins.",
      step2:"Conversión",
      step2text:"La mesa convierte a MXN.",
      step3:"Recibes MXN",
      step3text:"Fondos enviados vía SPEI.",
      cta:"Solicitar Cotización"
    }

  }

  const tx = t[lang]

  return (

<main className="min-h-screen bg-black text-white">

{/* HEADER */}

<header className="flex items-center justify-between p-6 max-w-6xl mx-auto">

<div className="flex items-center gap-3">

<Image
src="/logo.jpg"
alt="PondRail"
width={60}
height={60}
/>

<div className="text-xl font-bold">
PondRail
</div>

</div>

<div className="flex gap-3">

<button
onClick={()=>setLang("EN")}
className="text-sm opacity-70 hover:opacity-100"
>
EN
</button>

<button
onClick={()=>setLang("ES")}
className="text-sm opacity-70 hover:opacity-100"
>
ES
</button>

</div>

</header>


{/* HERO */}

<section className="text-center py-20 px-6">

<h1 className="text-4xl md:text-6xl font-bold mb-6">

{tx.heroTitle}

</h1>

<p className="text-lg opacity-70 max-w-xl mx-auto">

{tx.heroSub}

</p>

</section>


{/* CALCULATOR */}

<section className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-xl">

<h2 className="text-xl mb-6">

{tx.calculator}

</h2>

<input
type="number"
value={usd}
onChange={(e)=>setUsd(Number(e.target.value))}
className="w-full bg-black p-3 rounded mb-6"
/>

<div className="space-y-3 text-sm">

<div className="flex justify-between">
<span>{tx.gross}</span>
<span>{gross.toFixed(2)} MXN</span>
</div>

<div className="flex justify-between">
<span>{tx.fee}</span>
<span>{fee.toFixed(2)} MXN</span>
</div>

<div className="flex justify-between text-green-400 font-bold">
<span>{tx.net}</span>
<span>{final.toFixed(2)} MXN</span>
</div>

</div>

</section>


{/* HOW IT WORKS */}

<section className="py-20 px-6 max-w-6xl mx-auto">

<h2 className="text-3xl text-center mb-12">

{tx.how}

</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="bg-zinc-900 p-6 rounded-lg">

<h3 className="font-bold mb-2">{tx.step1}</h3>

<p className="opacity-70">{tx.step1text}</p>

</div>

<div className="bg-zinc-900 p-6 rounded-lg">

<h3 className="font-bold mb-2">{tx.step2}</h3>

<p className="opacity-70">{tx.step2text}</p>

</div>

<div className="bg-zinc-900 p-6 rounded-lg">

<h3 className="font-bold mb-2">{tx.step3}</h3>

<p className="opacity-70">{tx.step3text}</p>

</div>

</div>

</section>


{/* CTA */}

<section className="text-center pb-24">

<a
href="https://t.me/YOUR_TELEGRAM"
target="_blank"
className="bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold"
>

{tx.cta}

</a>

</section>


</main>

  )
}