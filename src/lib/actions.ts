"use server";

import { auth } from "@clerk/nextjs/dist/types/server";


export async function getSignedURL(){

  // const session = await auth();
  // if(!session){
  //   return { failure: "You must be logged in to upload a file"}
  // }
  return { success: {url: ""}} 
}