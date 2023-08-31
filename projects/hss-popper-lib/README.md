# hss-popper  

hss-popper is an angular wrapper for the [Popper.js](https://popper.js.org/) library.

# Note !! 
#####  Original source of this repository is - [MrFrankel](https://github.com/MrFrankel/ngx-popper)

## Changes

As of version 6.0.0 popper content runs in onPush change detection strategy, therefore forceChangeDetection is no longer necessary and is removed


As of version 4.0.0 hss-popper now use innerHTML binding for string popper i.e:
```HTML
<div popper="some text"></div>
```

This should make no difference but you should be aware.

As of version 4.0.0 popper.model is now popper-model, due to some angular-cli issues, if you are referencing this please update your references.

### Installation

node and npm are required to run this package.

1. Use npm/yarn to install the package:

  ```terminal
  $ npm install popper.js --save
  $ npm install hss-popper --save 
  ```
  
  Or 
  
   ```terminal
    $ yarn add popper.js --save
    $ yarn add hss-popper --save 
  ```

2. You simply add into your module `HssPopperModule`:

  ```typescript
  import {HssPopperModule} from 'hss-popper';
  
  @NgModule({
   // ...
   imports: [
     // ...
     HssPopperModule
   ]
  })
  ```
  

3. Add to view:

  ```HTML  
   <div     [popper]="popper1Content"
            [popperShowOnStart]="true"
            [popperTrigger]="'click'"
            [popperHideOnClickOutside]="true"
            [popperHideOnScroll]="true"
            [popperPlacement]="'bottom'">
         <p class="bold">Hey!</p>
         <p class="thin">Choose where to put your popper!</p>         
       </div>
       <popper-content #popper1Content>
         <p class="bold">Popper on bottom</p>
       </popper-content>
  ```

4. As text:
 ```HTML
      <div [popper]="'As text'"
           [popperTrigger]="'hover'"
           [popperPlacement]="'bottom'"
           (popperOnShown)="onShown($event)">
        <p class="bold">Pop</p>
        <p class="thin">on the bottom</p>
      </div>
 ```

  ```HTML
       <div popper="{{someTextProperty}}"
            [popperTrigger]="'hover'"
            [popperPlacement]="'bottom'"
            [popperStyles]="{'background-color: 'blue''}",
            (popperOnShown)="onShown($event)">
         <p class="bold">Pop</p>
         <p class="thin">on the bottom</p>
       </div>
  ```
 
  5. Position fixed, breaking overflow:
   ```HTML
        <div [popper]="'As text'"
             [popperTrigger]="'hover'"
             [popperPlacement]="'bottom'"
             [popperPositionFixed]="true"
             (popperOnShown)="onShown($event)">
        </div>
   ```
 
 6. Specific target:
  ```HTML
 <div class="example">
       <div #popperTargetElement></div>
       <div [popper]="'As text'"
            [popperTrigger]="'hover'"
            [popperPlacement]="'bottom'"
            [popperTarget]="popperTargetElement.nativeElement"
            (popperOnShown)="onShown($event)">
       </div>
  ```
  
7. hide/show programmatically:
  ```HTML
   <div [popper]="tooltipcontent"
           [popperTrigger]="'hover'"
           [popperPlacement]="'bottom'"
           [popperApplyClass]="'popperSpecialStyle'">
        <p class="bold">Pop</p>
        <p class="thin">on the bottom</p>
      </div>
      <popper-content #tooltipcontent>
        <div>
          <p>This is a tooltip with text</p>
          <span (click)="tooltipcontent.hide()">Close</span>
        </div>
      </popper-content>
  ```
 
8. Attributes map:  
  
    | Option                       | Type              | Default   | Description                                                                                              |
    |:-----------------------      |:----------------  |:--------- | :------------------------------------------------------------------------------------------------------  |
    | popperDisableAnimation       | boolean           | false     | Disable the default animation on show/hide                                                               |
    | popperDisableStyle           | boolean           | false     | Disable the default styling                                                                              |
    | popperDisabled               | boolean           | false     | Disable the popper, ignore all events                                                                    |
    | popperDelay                  | number            | 0         | Delay time until popper it shown                                                                         |
    | popperTimeout                | number            | 0         | Set delay before the popper is hidden                                                                    |
    | popperTimeoutAfterShow       | number            | 0         | Set a time on which the popper will be hidden after it is shown                                          |
    | popperPlacement              | Placement(string) | auto      | The placement to show the popper relative to the reference element                                       |
    | popperTarget                 | HtmlElement       | auto      | Specify a different reference element other the the one hosting the directive                            |
    | popperBoundaries             | string(selector)  | undefined | Specify a selector to serve as the boundaries of the element                                             |
    | popperShowOnStart            | boolean           | false     | Popper default to show                                                                                   |
    | popperTrigger                | Trigger(string)   | hover     | Trigger/Event on which to show/hide the popper                                                           |
    | popperPositionFixed          | boolean           | false     | Set the popper element to use position: fixed                                                            |
    | popperAppendTo               | string            | undefined | append The popper-content element to a given selector, if multiple will apply to first                   |
    | popperPreventOverflow        | boolean           | undefined | Prevent the popper from being positioned outside the boundary                                            |
    | popperHideOnClickOutside     | boolean           | true      | Popper will hide on a click outside                                                                      |
    | popperHideOnScroll           | boolean           | false     | Popper will hide on scroll                                                                               |
    | popperHideOnMouseLeave       | boolean           | false     | Popper will hide on mouse leave                                                                          |
    | popperModifiers              | popperModifier    | undefined | popper.js custom modifiers hock                                                                          |
    | popperApplyClass             | string            | undefined | list of comma separated class to apply on ngpx__container                                                |
    | popperStyles                 | Object            | undefined | Apply the styles object, aligned with ngStyles                                                           |
    | popperApplyArrowClass        | string            | undefined | list of comma separated class to apply on ngpx__arrow                                                    |
    | popperOnShown                | EventEmitter<>    | $event    | Event handler when popper is shown                                                                       |
    | popperOnHidden               | EventEmitter<>    | $event    | Event handler when popper is hidden                                                                      |
    | popperOnUpdate               | EventEmitter<>    | $event    | Event handler when popper is updated                                                                     |
    | popperAriaDescribeBy         | string            | undefined | Define value for aria-describeby attribute                                                               |
    | popperAriaRole               | string            | popper    | Define value for aria-role attribute                                                                     |



9. Override defaults:

    HSS-popper comes with a few default properties you can override in default to effect all instances
    These are overridden by any child attributes.
```JavaScript
NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HssPopperModule.forRoot({placement: 'bottom'})],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]

})
```
  
   | Options                  | Type              | Default   |
   |:-------------------      |:----------------  |:--------- |
   | showDelay                | number            | 0         |
   | disableAnimation         | boolean           | false     |
   | disableDefaultStyling    | boolean           | false     |
   | placement                | Placement(string) | auto      |
   | boundariesElement        | string(selector)  | undefined |
   | trigger                  | Trigger(string)   | hover     |
   | popperModifiers          | popperModifier    | undefined |
   | positionFixed            | boolean           | false     |
   | hideOnClickOutside       | boolean           | true      |
   | hideOnMouseLeave         | boolean           | false     |
   | hideOnScroll             | boolean           | false     |
   | applyClass               | string            | undefined |
   | styles                   | Object            | undefined |
   | applyArrowClass          | string            | undefined |
   | ariaDescribeBy           | string            | undefined |
   | ariaRole                 | string            | undefined |
   | appendTo                 | string            | undefined |
   | preventOverflow          | boolean           | undefined |

10. popperPlacement:

  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'bottom-start'
  | 'left-start'
  | 'right-start'
  | 'top-end'
  | 'bottom-end'
  | 'left-end'
  | 'right-end'
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | Function
  
11. popperTrigger:

  | 'click'
  | 'mousedown'
  | 'hover'
  | 'none'
  
    
### Demo
<a href="https://mrfrankel.github.io/hss-popper/">Demo</a>

### Contribute
  Hell ya!!!
  
```terminal
  $ npm install
  $ npm run build
  $ npm run dev  //run example
  $ npm run start_test  //run tests
```

