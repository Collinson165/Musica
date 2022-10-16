/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import collection from "../components/data/collections.json";

const Collections = () => {
    return ( 
        <div className="px-5 md:pl-20 py-5">
            <div>
                <button className="rounded-full py-1 px-4 m-2 bg-yellow-500">My collection</button>
                <button className="rounded-full py-1 px-4 m-2 border border-white hover:border-yellow-500 hover:bg-yellow-500">Likes</button>
            </div>
            <div className="flex">
                {collection && collection.collections.map(album => {
                    return(
                        
                        <div key={album.id}>
                            <Link href={`albums/${album.id}`}>
                            <div className="mx-2 relative overflow-hidden rounded-3xl cursor-pointer">
                                <div className="absolute bottom-0 py-2 px-2 bg-gradient-to-t from-black/80 to-transparent w-full">
                                    <p className="font-bold">{album.title}</p>
                                    <p className="text-sm">{album.artist}</p>
                                </div>
                                <div>
                                    <img src={album.img} alt={album.title} className="h-44" />
                                </div>
                                
                            </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Collections;