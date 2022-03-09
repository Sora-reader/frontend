export default function () {
  console.log(JSON.stringify(process.env));
  return <h1>{JSON.stringify(process.env)}</h1>
}
