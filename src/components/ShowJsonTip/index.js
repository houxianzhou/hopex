export default function (Props) {
  const { data = {} } = Props
  return (
    <textarea
      value={JSON.stringify(data)}
      onChange={() => {}}
      rows={5}
      style={{
        width: '40%',
        opacity: .5,
        position: 'fixed',
        top: 0,
        right: 450,
        background: 'white',
        color: 'black',
        margin: 10,
        zIndex: 10000,
      }} />
  )
}
