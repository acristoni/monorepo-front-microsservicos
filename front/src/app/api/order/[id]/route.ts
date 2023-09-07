import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } } ) {
    const res = await req.json()
    const cookieStore = cookies()
    const token = cookieStore.get('@token')
    const orderId = params.id;

    const headersList = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token?.value ? token.value : ''}` ,
    };
    
    const response = await fetch(`${process.env.URL_ORDER_MS}/${orderId}`, { 
        method: "PATCH",
        headers: headersList,
        body: JSON.stringify(res)
    });
    
    const message = await response.text();

    return NextResponse.json({ message })
}