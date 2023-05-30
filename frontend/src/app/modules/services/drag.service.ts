import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  /*
  * Tracks all available drop zones
  */
  private availableZones: any = {};

  /**
   * @desc responsible for storing the draggable elements
   */
  public startDrag() {

  }
  public endDrag() {
    //this.removeHighLightedAvailableZones();
  }

  public leaveDrag(zoneId: string) {
    this.removeHighLightedAvailableZones(zoneId);
  }

  public enterDrag(zoneId: string) {
    this.highLightAvailableZones(zoneId);
  }

  public dragOver(zoneId: string) {
    this.removeHighLightedAvailableZones(zoneId);
  }

  /**
   * @desc responsible for adding an available zone
   * @param {{ begin: Function, end: Function }} zoneID - zone key from DroppableOptions
   * @param {string} obj - reference to a start and stop object
   */

  public addAvailableDropZone(zoneId: string, obj: { begin: Function, end: Function }): void {
    this.availableZones[zoneId] = obj;
  }

  /**
   * @desc responsible for removing an available zone
   * @param {string} zoneId - the zone ID to search for
   */
  public removeAvailableZone(zoneId: string): void {
    delete this.availableZones[zoneId];
  }


  /**
   * @desc responsible for highlighting available zones
   * that a draggable element can be added too.
   */
  private highLightAvailableZones(zoneId: string): void {
    this.availableZones[zoneId].begin();
  }

  /**
   * @desc responsible for removing highlighted available zones
   * that a draggable element can be added too.
   */
  private removeHighLightedAvailableZones(zoneId: string): void {
    this.availableZones[zoneId].end();
  }
}
