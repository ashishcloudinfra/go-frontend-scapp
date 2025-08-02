interface IPageHeadingProps {
  title: string;
  description: string;
  descriptionOnTop?: boolean;
}

export default function PageHeading(props: IPageHeadingProps) {
  return (
    <div>
      {!!props.descriptionOnTop && <p className="text-sm text-gray-600">{props.description}</p>}
      <h1 className="text-2xl font-semibold">{props.title}</h1>
      {!props.descriptionOnTop && <p className="text-sm text-gray-600">{props.description}</p>}
    </div>
  )
}
