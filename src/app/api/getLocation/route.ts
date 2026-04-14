export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5`,
    {
      headers: {
        "User-Agent": "my-real-estate-app"
      }
    }
  )

  const data = await res.json()

  return Response.json(data)
}