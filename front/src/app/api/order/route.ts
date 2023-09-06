import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export async function GET(req: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('@token')
    console.log("🚀 ~ file: route.ts:7 ~ GET ~ token:", token)

    const headersList = {
        "Authorization": `Bearer ${token?.value ? token.value : ''}` 
    };
    console.log("🚀 ~ file: route.ts:10 ~ GET ~ headersList:", headersList)
    
    const response = await fetch(`${process.env.URL_ORDER_MS}/find`, { 
        method: "GET",
        next: { revalidate: 0 },
        headers: headersList
    });

    const data = await response.text();

    return NextResponse.json({ data })
}