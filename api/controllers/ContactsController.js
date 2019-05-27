/**
 * ContactsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    Contacts.find({}).exec((err, contacts) => {
      if (err) {
        res.send(500, { error: err});
      }
      res.view('list', { contacts: contacts });
    });
  },

  add: (req, res) => {
    res.view('add');
  },

  create: (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const photo = req.file('photo');

    if ( !_.isString( req.param('name') ) ||  !_.isString( req.param('email') ) || !_.isNumber( req.param('phone') )  || !_isObject( req.param('photo'))) {

      return res.redirect('back');
    }

    photo.upload({
      adapter: require('skipper-s3'),
      key: 'AKIASOAXMDDCFRNTGTQT',
      secret: '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',
      bucket: 'sails-bucket',
    }, (err, uploadedFile) => {
      if (err) {
        return res.serverError(err);
      }

      if (uploadedFile.length === 0){
        return res.badRequest('No file was uploaded');
      }
      console.log('this is what we have: ', uploadedFile);

      const photoname = uploadedFile[0].filename;
      const photouid = uploadedFile[0].fd.replace(/^.*[\\\/]/, '');

      Contacts.create({
        name, email, phone, photoname, photouid
      }).exec(err => {
        if(err) {
          res.send(500, { error: err });
        }
        res.redirect('/');
      });
    });
  },

  profile: (req, res) => {
    Contacts.findOne({
      id: req.params.id
    }).exec((err, contact) => {
      if(err) {
        res.send(500, { error: err });
      }
      res.view('profile', { contact: contact });
    });
  },
};

