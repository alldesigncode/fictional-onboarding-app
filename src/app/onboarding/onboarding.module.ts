import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';
import { BusinessDetailsAboutComponent } from './components/business-details-about/business-details-about.component';
import { ChooseComponent } from './components/choose/choose.component';
import { ChooseCompanyComponent } from './components/choose-company/choose-company.component';
import { ChooseStateComponent } from './components/choose-state/choose-state.component';
import { HeaderComponent } from './components/header/header.component';
import { TeamComponent } from './components/team/team.component';


@NgModule({
  declarations: [OnboardingComponent, BusinessDetailsComponent, BusinessDetailsAboutComponent, ChooseComponent, ChooseCompanyComponent, ChooseStateComponent, HeaderComponent, TeamComponent],
  imports: [
    CommonModule,
    ReactiveComponentModule,
    BrowserAnimationsModule
  ]
})
export class OnboardingModule { }
