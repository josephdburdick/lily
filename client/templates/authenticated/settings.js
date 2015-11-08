Template.settings.events( {
  'change #user-geolocation': ( ev, template ) => {
    template.locationTracking.set( ev.target.checked );
    let result = Modules.client.setGeolocation( template.locationTracking.get() );
    if ( !result ) {
      template.locationTracking.set( result );
      ev.target.checked = result;
    }
  }
} );

Template.settings.helpers( {
  checked: function () {
    return !!Template.instance().locationTracking.get() ? 'checked' : '';
  }
} );

Template.settings.onCreated( () => {
  Session.set("MeteorToys_display", true);
  let self = Template.instance();
  self.locationTracking = new ReactiveVar( false );
  self.subscribe( 'userSettings' );

  Tracker.autorun( ( computation ) => {
    if ( !!Settings.findOne() ) {
      let locationTracking = Settings.findOne().settings.locationTracking;
      self.locationTracking.set( locationTracking );
    }
  } );
} );

Template.settings.onRendered( () => {
  Session.set("MeteorToys_display", true);
});

Template.settings.onDestroyed( () => {
  self.stop();
} );