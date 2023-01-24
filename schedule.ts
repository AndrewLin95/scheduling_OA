// START: 12:30 PM 22Jan2023
//   2:00
// npx ts-node schedule.ts

import { daysOfMonth, Employee } from "./models";

const SINGLE = "single";
const DOUBLE = "double";
const COMMERICAL = "commercial";

const certified = "certified";
const pendingCert = "installer pending certification";
const laborer = "laborer";

const schedule = (buildings: string[], employees: Record<daysOfMonth, Employee>) => {
  // Every single and double building requires 1 certified. Every commericial requires 2. If there are no certified, can cut off the schedule there.
  // Since buildings are provided in their importance, if there are not enough builders for a building in sequence, can cut off. 
  //    If the cut off is at commercial, check if a double is after it. Since the number of workers is less, even though commercial is cut off, can may still fulfill the double building.
  // Return an array with indicies correlating to the day of the week [Monday, Tuesday... etc.].
  //    Within the array, return an object with string for building type, and the number / type of employee required for the build.

  const numberOfBuildingsCheck = (buildings: string[], employees: Employee) => {
    let buildingsToDo: any = [];

    let i = 0;
    let countOfCertified = 0;
    let countOfPendingCert = 0;
    let countOfLaborer = 0;

    // counter for variable amounts of commercial workers
    let numWorkerCheckLaborer = 0;
    let numWorkerCheckPendingCert = 0;

    while (countOfCertified < employees.certified && countOfPendingCert < employees.certified) {
      if (buildings[i] === COMMERICAL){
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
            } else if ( countOfPendingCert + 1 < employees.pendingCert) {
              countOfPendingCert ++;
              numWorkerCheckPendingCert++;
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
          buildingsToDo.push(buildings[i]);
          // TODO: else below - if reaches below, skip and check next index to see if completable
        } else {
          countOfCertified -= 2;
          countOfPendingCert -= 2;
          return buildingsToDo;
        }
      } else if (buildings[i] === DOUBLE) {
        countOfCertified ++; 
        // If no more certified, can straight up return, no more building projects can be completed
        if (countOfCertified > employees.certified) {
          return buildingsToDo;
        // assign laborers first
        } else if (countOfLaborer + 1 < employees.laborer) {
          buildingsToDo.push(buildings[i]);
        } else if (countOfPendingCert + 1 < employees.pendingCert) {
          buildingsToDo.push(buildings[i]);
        // if it reaches here, there are no laborers or pending cert available. Return.
        } else {
          return buildingsToDo;
        }
      } else {
        countOfCertified ++; 
        if (countOfCertified > employees.certified) {
          return buildingsToDo;
        } else {
          buildingsToDo.push(buildings[i]);
        }
      }
      i++;
    };
    return buildingsToDo;
  }

  const schedule = (buildingsRequired, employees) => {
    // [
    //   { index: 0, single: { certified: 1 } },
    //   { index: 1, double: { certified: 1 } },
    //   { index: 2, commercial: { certified: 1 } },
    //   { index: 3, single: { certified: 1 } }
    // ]

    // const obj = {
    //   index : i,
    // }
    // const builder = {
    //   certified: 1,
    // }
    // obj[buildings[i]] = builder

    // check remaining laborers.
    // ideally, assign pendingCerts to commercial, then assign laborers to rest...
    let countOfPendingCert = 0;
    let countOfLaborer = 0;

    let j = 0;
    while (j < buildingsRequired.length) {
      // for commercial buildings
      if (buildingsRequired[j] = COMMERICAL) {
        let obj = {
          index: j,
          commercial: {
            certified: 2,
            pendingCert: 2,
            laborer: 0,
          }
        };
      // check pending certs, skip if not enough. TODO: a way to index what was skipped and return to buildings. >insert beginning of array
      if (countOfPendingCert + 2 > employees.pendingCert){
        j ++;
      } else if (countOfLaborer + 1 < employees.laborer) {
        let remainingWorkers = 0;
        while (remainingWorkers < 4) {
          remainingWorkers++;
          obj.commercial = { certified: 2, pendingCert: 2, laborer: remainingWorkers }
        }
        j++;
      }
      return obj;
      } 
    }
  }

  const buildingsRequired = numberOfBuildingsCheck(buildings, employees.monday);
  // const result = schedule(buildingsRequired, employees.monday)
  console.log(buildingsRequired);

  return buildingsRequired;
}



const buildings = [SINGLE, DOUBLE, COMMERICAL, SINGLE, COMMERICAL, SINGLE, DOUBLE, COMMERICAL, SINGLE, COMMERICAL]
const employees = {
  monday: {
    certified: 6,
    pendingCert: 5,
    laborer: 8,
  },
  tuesday: {
    certified: 6,
    pendingCert: 5,
    laborer: 8,
  },
  wednesday: {
    certified: 6,
    pendingCert: 5,
    laborer: 8,
  },
  thursday: {
    certified: 6,
    pendingCert: 5,
    laborer: 8,
  },
  friday: {
    certified: 6,
    pendingCert: 5,
    laborer: 8,
  }
}

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