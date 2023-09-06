import { NextRequest, NextResponse } from 'next/server'
 
// export async function GET() {
//     let response = await fetch(`${process.env.URL_USER_MS}/cliente`, { 
//         method: "GET",
//         next: { revalidate: 0 }
//     });

//     let data = await response.text();

//     return NextResponse.json({ data })
// }

export async function POST( request: NextRequest ) {
    const res = await request.json()
    console.log("🚀 ~ file: route.ts:19 ~ POST ~ `${process.env.URL_USER_MS}/`:", `${process.env.URL_USER_MS}/`)
    try {    
        const response = await fetch(`${process.env.URL_USER_MS}/`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(res)
        });

        const responseString = await response.text();
        console.log("🚀 ~ file: route.ts:26 ~ POST ~ responseString:", responseString)
        const message = JSON.parse(responseString).message
        return NextResponse.json({ message }, { status: response.status });
    } catch(err) {
        return NextResponse.json({ mensagemUsuario: 'Erro interno da aplicação' }, { status: 500 });
    }
}