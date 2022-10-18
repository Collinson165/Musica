/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import collection from "../components/data/collections.json";
import useFetch from "../components/useFetch";

const Collections = () => {
    const {data:recommendations , loading, error} = useFetch(
        {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/songs/list-recommendations',
            params: {key: '484129036', locale: 'en-US'},
            headers: {
              'X-RapidAPI-Key': 'ce2d22d55emsh44258fe5c59c9f7p175afajsn645a4e24eb59',
              'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
          }  
      )
      
    return ( 
        <div className="px-5 md:pl-20 py-5">
            <div>
                <button className="rounded-full py-1 px-4 m-2 bg-yellow-500">My collection</button>
                <button className="rounded-full py-1 px-4 m-2 border border-white hover:border-yellow-500 hover:bg-yellow-500">Likes</button>
            </div>
            <div className="inline-block">
                {collection && collection.collections.map(album => {
                    return(
                        
                        <div key={album.id} className="inline-block">
                            <Link href={`albums/${album.id}`}>
                            <div className="mx-1 md:mx-2 relative overflow-hidden rounded-3xl cursor-pointer">
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

                {recommendations && recommendations.tracks.map(album => {
                    return(
                        
                        <div key={album.key} className="inline-block">
                            <div className="mx-1 md:mx-2 relative overflow-hidden rounded-3xl cursor-pointer" onClick={() => window.open(`${album.share.href}`, '_blank')}>
                                <div className="absolute bottom-0 py-2 px-2 bg-gradient-to-t from-black/80 to-transparent w-full">
                                    <p className="font-bold">{album.title}</p>
                                    <p className="text-sm">{album.subtitle}</p>
                                </div>
                                <div>
                                    <img src={album.images.coverart} alt={album.title} className="h-44" />
                                </div>
                                
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Collections;