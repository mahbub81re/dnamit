import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { qrcode, status, date } = await req.json();
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Dhaka', 
      hour12: true 
    });

    // ১. সার্ভিস অ্যাকাউন্ট অথেন্টিকেশন
 const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "madrasa-attendance@hidden-marker-431305-n6.iam.gserviceaccount.com",
    // .replace লজিকটি নিশ্চিত করে যে কী-টি ডিকোডারের জন্য পঠনযোগ্য
    private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCUQ6BobR8WqXeJ\nHdek+o4jCHDkQbVElao71Pr8wwZN0Adi9SpEtDbYugSxIIu29u+xGbjpUCQV2idy\nOdXj7oMDfef0JPM9Xvxyw7dxEbi5S0SAQE0QO0+O03ZRK6nPvRMIXki8QpdIiTZi\nmlbq86phrRObQi6qToob4V/E1yMQYN5yQIum3OZrHcz2vBh9b/ellcklk8IOn8+2\n4rJfqHt2xFY8/WQEkcavnXIvVNufhr/Bs2GiXag5rniwBKkJn2Kr+gCOnAaBNp5g\nJc0yYCouxq6jG8E54skjNKYsdELbOygtyYsgPizy5QeK1kfKs3SKfHju51ersqhi\nJyg/lnpxAgMBAAECggEAAJvrZjfA+/C8uU5AojJPhZynYEpylrz7i7XSKMvhMKOH\nzSBg7Gf+5Mt4m+hVUbVtwmu12jIth1OspnnPA3ZbesGjGNo2c14zhiy5NL+Xjh35\n0NdIHVFJ8gt6yJ132+RGnWgTFKPKuU4dN2nQAkLbGcUtBf+y0u65OBL9fvKC210j\nkpAX9CcBX3k/72AC3s/AAk1OdTAq2chmKECnzBl/6zccDwEvO9on4r/lNVxf6AZh\njFb/8C2n+imlVFY25TKZoCTaX29bNvk794XXu0pJi3QqczoPok5DPO3/dGTxsTYK\nC16wKkCr0Wx9ge/cYPImoV0Kff60DRIVXWIEszchwQKBgQDMUxCwNEb9oJd3ICUP\nBWH1dbifFPyqA59/IbQZ64GIdyXjISnwp0N/YNDIXvglWK95bjdJFY65d11jp/nT\nMXtd6JWpnZWEZUObhjbPUVvyziZ2enYCapsYY6Xk7prGGp9RDJgoIUoSKqKHBAZP\nQk9XkuHEVLZjXl5pA4luEJTiuQKBgQC5wvOQ1U4y7W6z6QZf2e84+NXJIdnvn/KH\n9bd51eq1dj3VJxxxN22XD5150IwbpEhp4Ueja+m5/6M8We92JwQRXj+b3wE93CE9\nFiBNNFwQ9Eniu92pwLFACzFp6lIP4v2J7hlsPoBzpxuvxTh6xtt7kR2JdhU6q94H\ndS3Cuw1ZeQKBgBc8dxBi0ZP0WGVOvYgox4wfmCBXRaicAt51WcL82l1Hl4Jt+hQJ\nIY7x1qyCyFuO61224Aiqr/F9lpxHtQyEexAh7Cs+5YsJ7RdZuw/2o6tIMG2W3abG\nst6iLnKLhAR1cJrKAN/HcWIBgTwzg/gthVJjPNOUAq3oRHpS0aU3s4bZAoGAAkmT\nRDpMLzZbQZ3h9TYyyunNgB+JlnjKvL/a1YY70KY3FrPXltFO6ShJESHvR7vbJGqg\nvjNq+l5afTjCSRsr4qbdc6boVgGq6xyloy284HyRmFgl35w+0oIQxrQa9JUf+B3V\ndE7EuCfboGt2SZS/SSM9UN8CXemV31OjD53MCUkCgYAZNcOyO2YRlCwfuuwMFSBv\n6fApmV9GKEieLJpKzB+CRBoCf3yUapG+mTs6aGU4yVdS25aURAWNDkWTn0piMrmA\njIKXGlwS6kPLCKeCD65DPk5P7qJi7lE6nLu02+36n4DArev6l/WHX4KAOmpm45PL\nMINmI6mjy1T5nfaObuSHTw==\n-----END PRIVATE KEY-----\n",
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '16UYdrUllWkBK1kjHsVTtBirGWyduQkAkYCfB1fuMerM';

    // ২. আইডি প্যাটার্ন অনুযায়ী টাইপ নির্ধারণ
    const userType =  'Teacher' ;

    // ৩. 'Attendance' নামক শিটে ডাটা পাঠানো
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Attendance!A1', // শিটের নাম 'Attendance' হতে হবে
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[date, qrcode, userType, status, time]],
      },
    });

    return NextResponse.json({ status: 'success', message: `${userType} হাজিরা সফল` });
    
  } catch (error: any) {
    console.error("Sheet Error:", error.message);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}