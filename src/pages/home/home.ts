import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { ShareProvider } from '../../providers/share/share';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sensitivity_value: number = 99.00;
  specificity_value: number = 90.00;
  prevalence_value: number = 15.11;
  population: number = 100000;

  abs_prevalence: number;
  abs_truepos: number;
  abs_falseneg: number;
  abs_wellpeople: number;
  abs_trueneg: number;
  abs_testneg: number;
  abs_falsepos: number;
  abs_testpos: number;

  false_positive: number;
  false_negative: number;
  positive_predictive: number;
  negative_predictive: number;
  accuracy: number;

  item: any = [];

  constructor(public navCtrl: NavController, public shareProvider: ShareProvider) {
    this.calculations();
  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  sensitivityModel(e) {
    console.log("sensitivityModel; value: ", e._value);
    this.sensitivity_value = this.round(e._value, 2);
    this.calculations();
  }

  specificityModel(e) {
    console.log("specificityModel; value: ", e._value);
    this.specificity_value = this.round(e._value, 2);
    this.calculations();
  }

  prevalenceModel(e) {
    console.log("prevalenceModel; value: ", e._value);
    this.prevalence_value = this.round(e._value, 2);
    this.calculations();
  }

  calculations() {
    console.log("Calculating the stuff ....");

    this.item.population = 100000;

    // condition-positive people = absolute number of sick people (from prevalence)
    this.item.abs_prevalence = this.round(this.prevalence_value / 100 * this.item.population, 0);

    // true positive people = sensitivity * absolute number of sick people
    this.item.abs_truepos = this.round(this.sensitivity_value / 100 * this.item.abs_prevalence, 0);

    // false negative people = abs_prevalence - abs_truepos
    // = abs_prevalence * (1-sensitivity/100)
    this.item.abs_falseneg = this.round(this.item.abs_prevalence - this.item.abs_truepos, 0);

    // absolute well people = condition-negative people
    this.item.abs_wellpeople = this.round(this.item.population - this.item.abs_prevalence, 0);

    // true negative people = specificity * absolute number of well people
    this.item.abs_trueneg = this.round(this.specificity_value / 100 * this.item.abs_wellpeople, 0);

    // absolute number of negative test - result
    this.item.abs_testneg = this.round(this.item.abs_falseneg + this.item.abs_trueneg, 0);

    // absolute number of false - positive people = well people - true negative people
    this.item.abs_falsepos = this.round(this.item.abs_wellpeople - this.item.abs_trueneg, 0);

    // absolute number of positive test - result
    this.item.abs_testpos = this.round(this.item.abs_truepos + this.item.abs_falsepos, 0);


    // # false-positive rate
    this.item.false_positive = this.round(this.item.abs_falsepos / this.item.abs_wellpeople * 100, 2);
    // false - negative rate
    this.item.false_negative = this.round(this.item.abs_falseneg / this.item.abs_prevalence * 100, 2);

    // positive predictive value
    this.item.positive_predictive = this.round(this.item.abs_truepos / this.item.abs_testpos * 100, 2);
    // negative predictive value
    this.item.negative_predictive = this.round(this.item.abs_trueneg / this.item.abs_testneg * 100, 2);

    // accuracy
    this.item.accuracy = this.round(((this.item.abs_truepos + this.item.abs_trueneg) / this.item.population) * 100, 2);

    this.shareProvider.item = this.item;
  }
}


/*
# population
population = 100000

# condition-positive people = absolute number of sick people (from prevalence)
abs_prevalence = (float(prevalence) / 100) * population

# true positive people = sensitivity * absolute number of sick people
abs_truepos = (float(sensitivity) / 100) * abs_prevalence

# false negative people = abs_prevalence - abs_truepos
# = abs_prevalence * (1-float(sensitivity)/100)
abs_falseneg = abs_prevalence - abs_truepos

# absolute well people = condition-negative people
abs_wellpeople = population - abs_prevalence

# true negative people = specificity * absolute number of well people
abs_trueneg = (float(specificity) / 100) * abs_wellpeople

# absolute number of negative test-result
abs_testneg = abs_falseneg + abs_trueneg

# absolute number of false-positive people = well people - true negative people
abs_falsepos = abs_wellpeople - abs_trueneg

# absolute number of positive test-result
abs_testpos = abs_truepos + abs_falsepos

# false-positive rate
false_pos = "{:.2f}".format((abs_falsepos / abs_wellpeople) * 100)
# false-negative rate
false_neg = "{:.2f}".format((abs_falseneg / abs_prevalence) * 100)

# positive predictive value
predict_pos = "{:.2f}".format((abs_truepos / abs_testpos) * 100)
# negative predictive value
predict_neg = "{:.2f}".format((abs_trueneg / abs_testneg) * 100)

# accuracy
accuracy = "{:.2f}".format(((abs_truepos + abs_trueneg) / population) * 100)
*/