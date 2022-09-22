import Parse from "parse";

export default{
    async getExperiences(){
        const currentUser = Parse.User.current();
    
        if (currentUser) {
          const username = currentUser.get('username')

            const query = new Parse.Query("Experience");
            query.equalTo('username',username)
            query.descending("createdAt");
            const results = await query.find();
            return results
            
          }

    },
  async getPointer(id){
        const experienceClass=Parse.Object.extend("Experience");
         const experienceQuery=new Parse.Query(experienceClass);
         var a= await experienceQuery.get(id).then((object) => {
              return object
    
              }
              ).catch((error) =>  {
                console.log("error",error)
              });
    
              return a;
     }  ,
    async deleteObj(id){
              const experienceClass=Parse.Object.extend("Experience");
               const experienceQuery=new Parse.Query(experienceClass);
               var a= await experienceQuery.get(id).then((object) => {
                    return object
          
                    }
                    ).catch((error) =>  {
                      console.log("error",error)
                    });
          
                    // a.destroy().then((obj)=>{console.log(obj)})
                    a.destroy()
    }  ,

    async sumOfExpHours(){
      const currentUser = Parse.User.current();
      var minutes=0
  
      if (currentUser) {
        const username = currentUser.get('username')

          const query = new Parse.Query("Experience");
          query.equalTo('username',username)
          query.descending("createdAt");
          const results = await query.find();
          for(const obj of results){

            const totalMinutes = obj.get("totalMinutes")
        
            minutes+=totalMinutes
            // console.log(minutes)
          }
          
        }

        return minutes

  },
     
}