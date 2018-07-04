export default function (Props) {
  const { data = {} } = Props
  return (
    <textArea
      rows={5}
      style={{
        width: '40%',
        opacity: .5,
        position: 'fixed',
        top: 0,
        right: 30,
        background: 'white',
        color: 'black',
        margin: 10,
        zIndex: 10000,
      }} >{JSON.stringify(data)}</textArea >
  )
}
