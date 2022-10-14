/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import collection from "./components/data/collections.json";

const Collections = () => {
    return ( 
        <div className="px-5 md:pl-20 py-5">
            <div>
                <button className="rounded-full py-1 px-4 m-2 bg-yellow-500">My collection</button>
                <button className="rounded-full py-1 px-4 m-2 border border-white">Likes</button>
            </div>
            <div className="flex">
                {collection && collection.collections.map(album => {
                    return(
                        
                        <div key={album.id}>
                            <Link href={`albums/${album.id}`}>
                            <div className="mx-2 py-2">
                                <div className="absolute">
                                    <p>{album.title}</p>
                                    <p>{album.artist}</p>
                                </div>
                                <div>
                                    <img src={album.img} alt={album.title} className="h-36" />
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