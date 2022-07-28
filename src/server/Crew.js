import Parse from "parse";
export default {

async getCrewMembers(){
    // var arr=[];
    const currentUser = Parse.User.current();

    if (currentUser) {
        const query = new Parse.Query("Crew");
        const results = await query.find();
        return results
        // try {

        //     for (const object of results) {
        //        arr.push(object) 
        //     }
        //     return arr;

        //   } catch (error) {
        //     console.error("Error", error);
        //   }
      }
    },
    
async getPointer(id){
    const CrewClass=Parse.Object.extend("Crew");
     const crewQuery=new Parse.Query(CrewClass);
     var a= await crewQuery.get(id).then((object) => {
          return object

          }
          ).catch((error) =>  {
            console.log("error",error)
          });

          return a;
        }    

}

