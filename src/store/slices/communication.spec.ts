import { describe, expect, it } from "vitest";
import { communication as reducer, save, clearStoreLocation, storeLocation } from "./communication";
import { LocationData } from "../../app/(tabs)";

const exampleState: any = {
  storedLocations: [],
  currentCommunicationIntervalNumber: 0,
  currentInterval: 10000,
};

describe("communication slice", () => {
  it("should be able to save a time interval", () => {
    const index = 1
    const timeInterval = 5000
    
    const state = reducer(exampleState, save([index, timeInterval]))

    expect(state.currentCommunicationIntervalNumber).toEqual(1);
    expect(state.currentInterval).toEqual(5000);
  });

  it("should be able to store a location in offline mode", () => {
    const storedLocation = {
      id: "e1cecdae-d7ed-4bb2-91ef-a34a1c82adef",
      latitude: 37.4220936,
      longitude: -122.083922,
      speed: 0,
      time: "2023-11-01T18:58:23.520Z",
    };

    const state = reducer(exampleState, storeLocation(storedLocation));

    expect(state.storedLocations).toEqual([storedLocation]);
  });

  it("should be able to clear locations", () => {
    const storedLocation = {
      id: "e1cecdae-d7ed-4bb2-91ef-a34a1c82adef",
      latitude: 37.4220936,
      longitude: -122.083922,
      speed: 0,
      time: "2023-11-01T18:58:23.520Z",
    };
    
    reducer(exampleState, storeLocation(storedLocation));
    const state = reducer(exampleState, clearStoreLocation());

    expect(state.storedLocations).toHaveLength(0);
  });
});
