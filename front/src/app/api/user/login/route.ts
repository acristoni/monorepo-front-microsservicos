import { NextRequest, NextResponse } from 'next/server'
 
export async function POST( request: NextRequest ) {
    const res = await request.json()
    
    try {    
        const response = await fetch(`${process.env.URL_USER_MS}/login?email=${res.email}&senha=${res.senha}`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseString = await response.text();
        let message = JSON.parse(responseString).access_token
        
        if (message === undefined) {
            message = JSON.parse(responseString).message
        }
        
        return NextResponse.json({ message }, { status: response.status });
    } catch(err) {
        return NextResponse.json({ message: 'Senha ou email inválido' }, { status: 403 });
    }
}