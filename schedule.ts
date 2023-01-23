// START: 12:30 PM 22Jan2023
//   2:00
// npx ts-node schedule.ts

import { daysOfMonth, Employee } from "./models";

const single = "single";
const double = "double";
const commercial = "commercial";

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
    while (countOfCertified < employees.certified) {
      if (buildings[i] === commercial){
        countOfCertified += 2;
        // if adding this building type exceeds the number of certified workers, do not add and remove the count then iterate.
        if (countOfCertified > employees.certified) {
          // to implement: If the cut off is at commercial, check if a double is after it. Since the number of workers is less, even though commercial is cut off, can may still fulfill the double building.
          // countOfCertified -= 2;
          return buildingsToDo;
        } else {
          buildingsToDo.push(buildings[i]);
        }
      } else {
        countOfCertified ++; 
        buildingsToDo.push(buildings[i]);
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
      if (buildingsRequired[j] = commercial) {
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
      }
      return obj;
      } 
    }
  }

  const buildingsRequired = numberOfBuildingsCheck(buildings, employees.monday);
  const result = schedule(buildingsRequired, employees.monday)
  console.log(result);

  return result;
}



const buildings = [single, double, commercial, single, commercial, single, double, commercial, single, commercial]
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