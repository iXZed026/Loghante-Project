// features/loghante(root)/api/artifact.api.ts


import { fetcher } from "@/lib/api/fetcher";


export interface Artifact {
  id:number;
  title:string;
  image:string;
}



export async function getArtifacts(){

 return fetcher<Artifact[]>(
   "/artifacts",
   {
     next:{
       revalidate:60
     }
   }
 );

}