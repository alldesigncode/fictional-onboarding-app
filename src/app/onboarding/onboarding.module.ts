import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseCompanyComponent } from './components/choose-company/choose-company.component';
import { ChooseStateComponent } from './components/choose-state/choose-state.component';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';
import { BusinessDetailsAboutComponent } from './components/business-details-about/business-details-about.component';
import { TeamComponent } from './components/team/team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChooseComponent } from './components/choose/choose.component';

@NgModule({
  declarations: [
    ChooseCompanyComponent,
    ChooseStateComponent,
    BusinessDetailsComponent,
    BusinessDetailsAboutComponent,
    TeamComponent,
    OnboardingComponent,
    HeaderComponent,
    ChooseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
  ],
})
export class OnboardingModule {}
