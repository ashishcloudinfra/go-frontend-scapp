interface IPageHeadingProps {
  title: string;
  description: string;
}

export default function PageHeading(props: IPageHeadingProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{props.title}</h1>
      <p className="text-sm text-gray-600">{props.description}</p>
    </div>
  )
}
