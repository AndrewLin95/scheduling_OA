// START: 12:30 PM 22Jan2023

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
  
  const numberOfBuildingsCheck = (buildings: string[], employees) => {

  }

  const checkBuildings = numberOfBuildingsCheck(buildings, employees.monday);




  
  return null;
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