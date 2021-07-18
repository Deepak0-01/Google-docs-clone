import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Link from "next/link";

function DocumentRow({ id, file, date }) {
  console.log(id);

  let url = `/docs/${id}`;

  return (
    <Link href={url}>
      <div className="flex items-center justify-start max-w-3xl m-auto py-2 rounded-lg px-2 cursor-pointer text-gray-700 hover:bg-gray-100 ">
        <Icon name="article" size="2xl" color="blue" />
        <p className="flex-grow pl-5 pr-10">{file}</p>
        <p className="mr-2">{date?.toDate().toLocaleDateString()}</p>
        <Button
          color="gray"
          buttonType="outline"
          size="regular"
          rounded={true}
          block={false}
          iconOnly={true}
          ripple="dark"
          className=" h-10 w-10 border-0"
        >
          <Icon name="more_vert" size="3xl" />
        </Button>
      </div>
    </Link>
  );
}

export default DocumentRow;
