import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemesComponent} from './dashboard/themes/themes.component';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ThemeEditComponent} from './dashboard/themes/theme-edit/theme-edit.component';
import {ThemeDetailComponent} from './dashboard/themes/theme-detail/theme-detail.component';
import {ThemeResolver} from './dashboard/themes/theme-resolver.service';
import {ConfigurationComponent} from './dashboard/configuration/configuration.component';
import {CreatorsComponent} from './dashboard/creators/creators.component';
import {CreatorEditComponent} from './dashboard/creators/creator-edit/creator-edit.component';
import {CreatorDetailComponent} from './dashboard/creators/creator-detail/creator-detail.component';
import {CreatorResolver} from './dashboard/creators/creator-resolver.service';
import {ProductLinesComponent} from './dashboard/product-line/product-lines.component';
import {ProductLineEditComponent} from './dashboard/product-line/product-line-edit/product-line-edit.component';
import {ProductLineDetailComponent} from './dashboard/product-line/product-line-detail/product-line-detail.component';
import {ProductLineResolver} from './dashboard/product-line/product-line-resolver.service';
import {PublishersComponent} from './dashboard/publishers/publishers.component';
import {PublisherEditComponent} from './dashboard/publishers/publisher-edit/publisher-edit.component';
import {PublisherDetailComponent} from './dashboard/publishers/publisher-detail/publisher-detail.component';
import {ExistingThemesResolver} from './dashboard/themes/existing-themes-resolver.service';
import {PublishersNamesResolver} from './dashboard/publishers/publishers-names-resolver.service';
import {PublishersResolver} from './dashboard/publishers/publishers-resolver.service';
import {ProductLineNamesResolver} from './dashboard/product-line/product-line-names-resolver.service';
import {CreatorNameResolver} from './dashboard/creators/creator-name-resolver.service';
import {CategoriesComponent} from './dashboard/categories/categories.component';
import {CategoryEditComponent} from './dashboard/categories/category-edit/category-edit.component';
import {CategoryDetailComponent} from './dashboard/categories/category-detail/category-detail.component';
import {CategoryResolver} from './dashboard/categories/category-resolver.service';
import {DashboardLoanComponent} from './dashboard-loan/dashboard-loan.component';
import {DashboardUserComponent} from './dashboard-user/dashboard-user.component';
import {GamesComponent} from './dashboard/games/games.component';
import {GameOverviewResolver} from './dashboard/games/game-overview-resolver.service';
import {GameSummaryComponent} from './dashboard/games/game-list/game-summary/game-summary.component';
import {GameListComponent} from './dashboard/games/game-list/game-list.component';
import {GameDetailComponent} from './dashboard/games/game-detail/game-detail.component';
import {GameResolver} from './dashboard/games/game-resolver.service';
import {GameEditComponent} from './dashboard/games/game-edit/game-edit.component';
import {CategoryHandlerComponent} from './dashboard/games/game-edit/category-handler/category-handler.component';
import {NameHandlerComponent} from './dashboard/games/game-edit/name-handler/name-handler.component';
import {ThemeHandlerComponent} from './dashboard/games/game-edit/theme-handler/theme-handler.component';
import {InfoHandlerComponent} from './dashboard/games/game-edit/info-handler/info-handler.component';
import {CreatorHandlerComponent} from './dashboard/games/game-edit/creator-handler/creator-handler.component';
import {LineHandlerComponent} from './dashboard/games/game-edit/line-handler/line-handler.component';
import {PublisherHandlerComponent} from './dashboard/games/game-edit/publisher-handler/publisher-handler.component';
import {SizeHandlerComponent} from './dashboard/games/game-edit/size-handler/size-handler.component';
import {StuffHandlerComponent} from './dashboard/games/game-edit/stuff-handler/stuff-handler.component';
import {ImageHandlerComponent} from './dashboard/games/game-edit/image-handler/image-handler.component';
import {GameEditHelperComponent} from './dashboard/games/game-edit/game-edit-helper/game-edit-helper.component';
import {DescriptionHandlerComponent} from './dashboard/games/game-edit/description-handler/description-handler.component';
import {WrapperEditResolver} from './shared/resolvers/wrapper-edit-resolver.service';
import {NavResolverService} from './shared/resolvers/nav-resolver.service';
import {NewGameBasicsComponent} from './dashboard/games/new-game/new-game-basics/new-game-basics.component';
import {WrapperNewResolver} from './shared/resolvers/wrapper-new-resolver.service';
import {NewGameComponent} from './dashboard/games/new-game/new-game.component';
import {NewGameParentChoiceComponent} from './dashboard/games/new-game/new-game-parent-choice/new-game-parent-choice.component';
import {NewGameAddExtComponent} from './dashboard/games/new-game/new-game-add-ext/new-game-add-ext.component';
import {NewGameAddCoreComponent} from './dashboard/games/new-game/new-game-add-core/new-game-add-core.component';
import {NewGameInfosComponent} from './dashboard/games/new-game/new-game-infos/new-game-infos.component';
import {MemberNewComponent} from './dashboard-user/members/member-new/member-new.component';
import {MemberListComponent} from './dashboard-user/members/member-list/member-list.component';
import {MemberDetailComponent} from './dashboard-user/members/member-detail/member-detail.component';
import {SelectMemberComponent} from './dashboard-loan/loans/select-member/select-member.component';
import {SelectGameComponent} from './dashboard-loan/loans/select-game/select-game.component';
import {ConfirmLoanComponent} from './dashboard-loan/loans/confirm-loan/confirm-loan.component';
import {LoanListComponent} from './dashboard-loan/loans/loan-list/loan-list.component';
import {LoanDetailComponent} from './dashboard-loan/loans/loan-detail/loan-detail.component';
import {LoanResolver} from './dashboard-loan/loans/loan-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    resolve: [NavResolverService],
    pathMatch: 'full',
  },
  {
    path: 'admin/locked-mode',
    canActivate: [AuthGuard],
    resolve: [WrapperNewResolver],
    data: {roles: ['ADMIN']},
    children: [
      {
        path: 'games/new',
        component: NewGameComponent,
        children: [
          {
            path: 'basics',
            component: NewGameBasicsComponent
          },
          {
            path: 'parent-choice',
            component: NewGameParentChoiceComponent
          },
          {
            path: 'add-extension',
            component: NewGameAddExtComponent
          },
          {
            path: 'add-core',
            component: NewGameAddCoreComponent
          },
          {
            path: 'add-core-summary',
            component: GameSummaryComponent
          },
          {
            path: 'infos',
            component: NewGameInfosComponent
          },
        ]
      },
      {
        path: 'games/:id/edit',
        component: GameEditComponent,
        resolve: [GameResolver, WrapperEditResolver],
        children: [
          {
            path: '',
            component: GameEditHelperComponent,
          },
          {
            path: 'name',
            component: NameHandlerComponent
          },
          {
            path: 'categories',
            component: CategoryHandlerComponent
          },
          {
            path: 'themes',
            component: ThemeHandlerComponent
          },
          {
            path: 'infos',
            component: InfoHandlerComponent
          },
          {
            path: 'creators',
            component: CreatorHandlerComponent
          },
          {
            path: 'line',
            component: LineHandlerComponent
          },
          {
            path: 'publisher',
            component: PublisherHandlerComponent
          },
          {
            path: 'description',
            component: DescriptionHandlerComponent
          },
          {
            path: 'size',
            component: SizeHandlerComponent
          },
          {
            path: 'stuff',
            component: StuffHandlerComponent
          },
          {
            path: 'images',
            component: ImageHandlerComponent
          },
        ]
      }
    ]
  },
  {
    path: 'admin',
    resolve: [NavResolverService],
    children: [
      {
        path: 'editor',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']},
        children: [
          {
            path: 'games',
            component: GamesComponent,
            resolve: [GameOverviewResolver],
            children: [
              {
                path: 'list',
                component: GameListComponent,
                // resolve: [GameOverviewResolver],
                children: [
                  {path: ':id', component: GameSummaryComponent}]
              },
              {
                path: 'detail/:id',
                component: GameDetailComponent,
                resolve: [GameResolver]
              }
            ]
          },
          {
            path: 'themes',
            component: ThemesComponent,
            children: [
              {path: 'new', component: ThemeEditComponent, resolve: [ExistingThemesResolver]},
              {path: ':id/edit', component: ThemeEditComponent, resolve: [ThemeResolver, ExistingThemesResolver]},
              {path: ':id', component: ThemeDetailComponent, resolve: [ThemeResolver]}
            ]
          },
          {
            path: 'creators',
            component: CreatorsComponent,
            children: [
              {path: 'new', component: CreatorEditComponent, resolve: [CreatorNameResolver]},
              {path: ':id/edit', component: CreatorEditComponent, resolve: [CreatorResolver, CreatorNameResolver]},
              {path: ':id', component: CreatorDetailComponent, resolve: [CreatorResolver]}
            ]
          },
          {
            path: 'product-lines',
            component: ProductLinesComponent,
            children: [
              {path: 'new', component: ProductLineEditComponent, resolve: [ProductLineNamesResolver]},
              {path: ':id/edit', component: ProductLineEditComponent, resolve: [ProductLineResolver, ProductLineNamesResolver]},
              {path: ':id', component: ProductLineDetailComponent, resolve: [ProductLineResolver]}
            ]
          },
          {
            path: 'publishers',
            component: PublishersComponent,
            children: [
              {path: 'new', component: PublisherEditComponent, resolve: [PublishersNamesResolver]},
              {path: ':id/edit', component: PublisherEditComponent, resolve: [PublishersResolver, PublishersNamesResolver]},
              {path: ':id', component: PublisherDetailComponent, resolve: [PublishersResolver]}
            ]
          },
          {
            path: 'categories',
            component: CategoriesComponent,
            resolve: [CategoryResolver],
            children: [
              {path: 'new', component: CategoryEditComponent},
              {path: ':id/edit', component: CategoryEditComponent, resolve: [CategoryResolver]},
              {path: ':id', component: CategoryDetailComponent, resolve: [CategoryResolver]}
            ]
          },
          {
            path: 'configuration',
            component: ConfigurationComponent
          }]
      },
      {
        path: 'loans',
        component: DashboardLoanComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']},
        children: [
          {
            path: 'select-member',
            component: SelectMemberComponent
          },
          {
            path: ':accountId/select-game',
            component: SelectGameComponent
          },
          {
            path: 'confirm',
            component: ConfirmLoanComponent
          },
          {
            path: 'list',
            component: LoanListComponent
          },
          {
            path: ':id',
            component: LoanDetailComponent,
            resolve: [LoanResolver]
          }
        ]
      },
      {
        path: 'members',
        component: DashboardUserComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']},
        children: [
          {
            path: 'new',
            component: MemberNewComponent
          },
          {
            path: 'list',
            component: MemberListComponent
          },
          {
            path: ':id',
            component: MemberDetailComponent
          }
        ]
      }
    ]
  },
  // {
  //   path: 'not-found',
  //   resolve: [NavResolverService],
  //   component: ErrorPageComponent,
  //   data: {message: 'page not found!'}
  // },
  // {
  //   path: '**',
  //   redirectTo: '/not-found'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    // , {enableTracing: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
