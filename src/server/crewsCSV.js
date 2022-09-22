import user from './user'
import Parse from "parse";

export default{
  

    async getCrewsData(){
        var obj={
            crews:[]
        }
        if(user.getCurrentUser){
              const crew = new Parse.Query("Crew");
              var crewsdata = await crew.find();
              for(const object of crewsdata){
                const id=object.id
                const realmId=object.get('realmId')
                const firstName=object.get('firstName')
                const lastName=object.get('lastName')
                const Position =object.get('Position')
                const EmployeeId =object.get('EmployeeId')
                const Nationality=object.get('Nationality')
                const LicenceNumber=object.get('LicenceNumber')
                const Note=object.get('Note')
                const isSelf=object.get('isSelf')
                obj.crews.push({
                    id:id,
                    realmId:realmId,
                    firstName:firstName,
                    lastName:lastName,
                    Position:Position,
                    EmployeeId:EmployeeId,
                    LicenceNumber:LicenceNumber,
                    Nationality:Nationality,
                    Note:Note,
                    isSelf:isSelf

                })

              }


        }

        return obj

    }

}