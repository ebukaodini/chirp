import './name-icon.scss';

type nameIconProp = {
  username: string
}

export default function NameIcon({ username }: nameIconProp) {
  return (
    <div className='__name_icon bg-primary p-2 text-light' title={username}>
      {username.substr(0,2).toUpperCase()}
    </div>
  )
}