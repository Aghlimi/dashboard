export async function GET() {
  const users = [
    { id: 1, name: "ahmed" },
    { id: 2, name: "mohamed" }
  ]

  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()

  const user = {
    id: Date.now(),
    name: body.name
  }

  return Response.json(user)
}
