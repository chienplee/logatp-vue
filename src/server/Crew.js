import Parse from "parse";
export default {
  async getCrewsLength() {
    const crew = new Parse.Query("Crew");
    var num = await crew.count();
    // console.log("num",num);
    return num;
  },
async getCrewMembers(limit,skip){
    // var arr=[];
    const currentUser = Parse.User.current();

    if (currentUser) {
        const query = new Parse.Query("Crew");
        limit ? query.limit(limit) : "";

        skip ? query.skip(skip) : "";
        // console.log("skip",skip);
        // console.log("limit",limit);

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
        }  ,
        
        async setSelf(value,id){
          var arr=[];
          const currentUser = Parse.User.current();
      
          if (currentUser) {
            // const CrewClass=Parse.Object.extend("Crew");
              const query = new Parse.Query("Crew");
              const results = await query.find();
              try {
      
                  for (const object of results) {
                      if(value && object.id==id){
                        object.set('isSelf',value);
                        arr.push(object);
                      }
                      else{
                        object.set('isSelf',false);
                        arr.push(object);
                      }
                      
                  }
                  Parse.Object.saveAll(arr);

                } catch (error) {
                  console.error("Error", error);
                }
            }
          },

          async findSelf(){
            // var arr=[];
            const currentUser = Parse.User.current();
        
            if (currentUser) {
                const query = new Parse.Query("Crew");
                query.equalTo("isSelf", true);
                const results = await query.first();
                if(results){
                  var obj={
                    'name': results.get('firstName')+ ' '+results.get('lastName'),
                    'id':results.id
                  };
                  return obj
                  
                }
                else{
                  return false
                }  
                }
                
            },

}

