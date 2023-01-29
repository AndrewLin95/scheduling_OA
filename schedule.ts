// START: 12:30 PM 22Jan2023
//   2:00
// npx ts-node schedule.ts

// GREEDY ALGORITHM FOR SCHEDULING


import { daysOfMonth, Employee, allEmployees } from "./models";

const SINGLE = "single";
const DOUBLE = "double";
const COMMERICAL = "commercial";

const MONDAY = "monday";

const certified = "certified";
const pendingCert = "installer pending certification";
const laborer = "laborer";

// Record<daysOfMonth, Employee>[]

const schedule = (buildings: string[], employees: any ) => {
  // Every single and double building requires 1 certified. Every commericial requires 2. If there are no certified, can cut off the schedule there.
  // Since buildings are provided in their importance, if there are not enough builders for a building in sequence, can cut off. 
  //    If the cut off is at commercial, check if a double is after it. Since the number of workers is less, even though commercial is cut off, can may still fulfill the double building.
  // Return an array with indicies correlating to the day of the week [Monday, Tuesday... etc.].
  //    Within the array, return an object with string for building type, and the number / type of employee required for the build.

  const numberOfBuildingsCheck = (buildings: string[], employees: Employee, dayOfWeek: string) => {
    let buildingsToDo: any = {};
    buildingsToDo[dayOfWeek] = [];

    let i = 0;
    let countOfCertified = 0;
    let countOfPendingCert = 0;
    let countOfLaborer = 0;

    // counter for variable amounts of commercial workers
    let numWorkerCheckLaborer = 0;
    let numWorkerCheckPendingCert = 0;
    // TODO: break for if there are no buildings left
    // TODO: stack for buildings
    // TODO: break for exceed of total employees - check if even required
    while (countOfCertified < employees.certified) {
      if (buildings[i] === COMMERICAL){
        let obj = {
          commercial : {
            certified: 2,
            pendingCert: 2,
            laborer: 0,
          }
        }
        countOfCertified += 2;
        countOfPendingCert += 2;
        // if adding this building type exceeds the number of certified workers, do not add and remove the count then iterate.
        if (countOfCertified > employees.certified || countOfPendingCert > employees.pendingCert) {
          // TODO: If the cut off is at commercial, check if a double is after it. Since the number of workers is less, even though commercial is cut off, can may still fulfill the double building.
          countOfCertified -= 2;
          countOfPendingCert -= 2;
          return buildingsToDo;
        // Check if we have enough of each workers to satisfy
        } else if ((numWorkerCheckLaborer + numWorkerCheckPendingCert) < 4) {
          while (numWorkerCheckLaborer + numWorkerCheckPendingCert < 4) {
            if (countOfLaborer + 1 < employees.laborer) {
              countOfLaborer ++;
              numWorkerCheckLaborer ++;
              obj.commercial = { certified: 2, pendingCert: (numWorkerCheckPendingCert + 2), laborer: numWorkerCheckLaborer}
            } else if ( countOfPendingCert + 1 < employees.pendingCert) {
              countOfPendingCert ++;
              numWorkerCheckPendingCert++;
              obj.commercial = { certified: 2, pendingCert: (numWorkerCheckPendingCert + 2), laborer: numWorkerCheckLaborer}
            // return since not enough workers
            // TODO: else below - if reaches below, skip and check next index to see if completable
            } else {
              countOfLaborer -= numWorkerCheckLaborer;
              countOfPendingCert -= numWorkerCheckPendingCert;
              numWorkerCheckLaborer = 0;
              numWorkerCheckPendingCert = 0;
              return buildingsToDo;
            }
          }
          buildingsToDo[dayOfWeek].push(obj);
          // reset counters
          numWorkerCheckLaborer = 0;
          numWorkerCheckPendingCert = 0;
          // TODO: else below - if reaches below, skip and check next index to see if completable
        } else {
          countOfCertified -= 2;
          countOfPendingCert -= 2;
          return buildingsToDo;
        }
      } else if (buildings[i] === DOUBLE) {
        let obj = {
          double : {
            certified: 1,
            pendingCert: 0,
            laborer: 0,
          }
        }
        countOfCertified ++; 
        // If no more certified, can straight up return, no more building projects can be completed
        if (countOfCertified > employees.certified) {
          return buildingsToDo;
        // assign laborers first
        } else if (countOfLaborer + 1 < employees.laborer) {
          obj.double = {certified: 1, pendingCert: 0, laborer: 1}
          buildingsToDo[dayOfWeek].push(obj);
        } else if (countOfPendingCert + 1 < employees.pendingCert) {
          obj.double = { certified: 1, pendingCert: 1, laborer: 0}
          buildingsToDo[dayOfWeek].push(obj);
        // if it reaches here, there are no laborers or pending cert available. Return.
        } else {
          return buildingsToDo;
        }
      } else {
        let obj = {
          single : {
            certified: 1,
            pendingCert: 0,
            laborer: 0,
          }
        }
        countOfCertified ++; 
        if (countOfCertified > employees.certified) {
          return buildingsToDo;
        } else {
          buildingsToDo[dayOfWeek].push(obj);
        }
      }
      i++;
    };
    return buildingsToDo;
  }

  let schedule = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  };

  let i = 0;
  const dayOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  let _buildings = buildings;
  while (i < 5) {
    const buildingsRequired = numberOfBuildingsCheck(_buildings, employees[i][dayOfWeek[i]], dayOfWeek[i]);
    schedule[dayOfWeek[i]] = buildingsRequired;
    i++;
  }

  console.log(schedule);
  
  return schedule;
}



const buildings = [SINGLE, DOUBLE, COMMERICAL, SINGLE, COMMERICAL, SINGLE, DOUBLE, COMMERICAL, SINGLE, COMMERICAL]
const employees = [
  {
    monday: {
      certified: 6,
      pendingCert: 5,
      laborer: 8,
    },
  },
  {
    tuesday: {
      certified: 6,
      pendingCert: 5,
      laborer: 8,
    },
  },
  {
    wednesday: {
      certified: 6,
      pendingCert: 5,
      laborer: 8,
    },
  },
  {
    thursday: {
      certified: 6,
      pendingCert: 5,
      laborer: 8,
    },
  },
  {
    friday: {
      certified: 6,
      pendingCert: 5,
      laborer: 8,
    },
  },
]

const result = schedule(buildings, employees);

const tempResultOutputSchema = {
  monday: [
    {
      index: 1,
      single: {
        certified: 1
      }
    },
    {
      index: 2,
      double: {
        certified: 1,
        pendingCert: 1,
      }
    },
    {
      index: 3,
      commercial: {
        certified: 2,
        pendingCert: 2,
        laborer: 4
      }
    }
  ],
  tuesday: [
    {
      index: 1,
      single: {
        certified: 1
      }
    },
    {
      index: 2,
      double: {
        certified: 1,
        pendingCert: 1,
      }
    }
  ]
}