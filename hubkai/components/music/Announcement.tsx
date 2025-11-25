type Props = {
    children: React.ReactElement | string;
}

function Announcement({children}: Props) {
    return ( <p
          className="text-sm mx-auto font-inter text-plume-wine border-2
         border-plume-wine rounded-md p-2 w-10/12 sm:w-6/12
         bg-gradient-to-r from-purple-50 to-violet-50 shadow-md"
        >
         {children}
        </p> );
}

export default Announcement;