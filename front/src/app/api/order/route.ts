import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export async function GET(req: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('@token')

    const headersList = {
        "Authorization": `Bearer ${token?.value ? token.value : ''}` 
    };
    
    const response = await fetch(`${process.env.URL_ORDER_MS}/find`, { 
        method: "GET",
        next: { revalidate: 0 },
        headers: headersList
    });

    const data = await response.text();

    return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
    const res = await req.json()
    const cookieStore = cookies()
    const token = cookieStore.get('@token')

    const headersList = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token?.value ? token.value : ''}` ,
    };
    
    const response = await fetch(`${process.env.URL_ORDER_MS}/`, { 
        method: "POST",
        headers: headersList,
        body: JSON.stringify(res)
    });
    
    const data = await response.text();
    const responseObj = JSON.parse(data)
    const message = responseObj.message

    return NextResponse.json({ message })
}