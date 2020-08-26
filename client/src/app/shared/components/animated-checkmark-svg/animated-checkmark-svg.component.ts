import { Component, OnInit, Input } from '@angular/core';

// load snapsvg with types
import 'snapsvg-cjs';
import * as SNAPSVG_TYPE from 'snapsvg';
declare var Snap: typeof SNAPSVG_TYPE;
//declare var mina: any; // snapsvg animation

@Component({
  selector: 'app-animated-checkmark-svg',
  templateUrl: './animated-checkmark-svg.component.html',
  styleUrls: ['./animated-checkmark-svg.component.scss']
})
export class AnimatedCheckmarkSvgComponent implements OnInit {

  @Input() htmlId: string = '';
  @Input() size: number;

  private pathUn: SNAPSVG_TYPE.Element;
  private pathMid: SNAPSVG_TYPE.Element;
  private pathChk: SNAPSVG_TYPE.Element;

  private dUn: string;
  private dMid: string;
  private dChk: string;

  constructor() { }

  ngOnInit(): void {
    // const s = Snap('#snapSvg');
    // const c = s.circle(50, 50, 50);
    // c.animate({r:10}, 2000);    
    // c.attr({
    //   fill: 'red',
    //   stroke: 'yellow',
    //   strokeWidth: 5
    // });

    // this.pathUn = Snap.select('#CheckedPath_un');
    // this.pathMid = Snap.select('#CheckedPath_mid');
    // this.pathChk = Snap.select('#CheckedPath_chk');
    //debugger;
    this.pathUn = Snap.select('.animated-checkmark-unchecked');
    this.pathMid = Snap.select('.animated-checkmark-midchecked');
    this.pathChk = Snap.select('.animated-checkmark-checked');

    this.dUn = this.pathUn.node.getAttribute('d');
    this.dMid =this.pathMid.node.getAttribute('d');
    this.dChk =this.pathChk.node.getAttribute('d');

    // var toUnchk = () => { this.pathUn.animate({ d: this.dUn }, 200, mina.easein, toMid1); }
    // var toMid1 = () => { this.pathUn.animate({ d: this.dMid }, 200, mina.easeout, toChk); }
    // var toChk = () => { this.pathUn.animate({ d: this.dChk }, 200, mina.easein, toMid2); }
    // var toMid2 = () => { this.pathUn.animate({ d: this.dMid }, 200, mina.easeout, toUnchk); }

    // var transitionChecked = this.animate.bind(this, )

    //toMid1();
  }

  public checked: boolean = false;
  private time: number = 80;
  private midTr = mina.easein;
  private lastTr = mina.easeout;

  public animate() {
    if (this.checked) {
      this.transitionUnchecked()
    } else {
      this.transitionChecked();
    }     
    this.checked = !this.checked;
  }

  private transitionChecked() {
    var toMid1 = () => { this.pathUn.animate({ d: this.dMid }, this.time, this.midTr, toChk); }
    var toChk = () => { this.pathUn.animate({ d: this.dChk }, this.time, this.lastTr); }
    toMid1();

    // let f = this.ani.bind(this, [this.dChk, this.time]);
    // debugger;
    // this.ani(this.dMid, this.time, f);
  }
  private transitionUnchecked() {
    var toMid2 = () => { this.pathUn.animate({ d: this.dMid }, this.time, this.midTr, toUnchk); }
    var toUnchk = () => { this.pathUn.animate({ d: this.dUn }, this.time, this.lastTr); }
    toMid2();
  }

  private ani(d: string, time: number, callback?: () => {}) {
    debugger;
    if (callback) {
      this.pathUn.animate({ d: d }, time, mina.linear, callback);
    } else {
      this.pathUn.animate({ d: d }, time, mina.linear);
    }
  }
}
