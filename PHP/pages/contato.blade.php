	<!-- Contato -->
	<div class="section section-sm section-bottom">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
			<h3 class="title-md text-theme hr-left mb-40">Entre em contato</h3>
            <p class="text-theme lead">Envie sugestões, dúvidas ou simplesmente fale conosco. Estamos a sua disposição.</p>
            <ul class="list-unstyled list-md text-theme">
              <li><i class="fa fa-phone fa-box"></i>Phone: +371 9800 4893</li>
              <li><i class="fa fa-envelope fa-box"></i>suporte@mercpop.com</li>
            </ul>
            <h3 class="title-md text-theme">Horário de serviço</h3>
            <ul class="list-unstyled list-md text-theme">
              <li><i class="fa fa-clock-o fa-box"></i>Monday - Friday 9am to 5pm</li>
            </ul>
          </div>

          <div class="col-md-5 col-md-offset-1">
            <h3 class="title-md text-theme hr-left">Deixe sua mensagem</h3>
            <form class="form-bg text-theme" id="contact" name="contact" method="post" novalidate="novalidate">
              <div class="form-group">
                <label for="name">Name
                  <span class="required">*</span>
                </label>
                <input class="form-control" type="text" name="name" id="name" size="30" value="" required="">
              </div>
              <div class="form-group">
                <label for="email">Email
                  <span class="required">*</span>
                </label>
                <input class="form-control" type="text" name="email" id="email" size="30" value="" required="">
              </div>
              <div class="form-group text-theme">
                <label for="message">Message
                  <span class="required">*</span>
                </label>
                <textarea class="form-control" rows="6" name="message" id="message" required=""></textarea>
              </div>
              <button id="submit" type="submit" class="btn btn-primary text-theme" name="submit" value="Send"><i class="fa fa-paper-plane"></i>Send Message</button>
            </form>
			
            <div id="success" class="mt-40">
              <div class="icon-box bordered">
                <i class="fa fa-check fa-round fa-4x text-theme"></i>
                <h3 class="lead text-theme">Your message was successfully sent!</h3>
              </div>
            </div>

            <div id="error" class="mt-40">
              <div class="icon-box bordered">
                <i class="fa fa-lock fa-round fa-4x text-theme"></i>
                <h3 class="lead text-theme">Something went wrong, try refreshing and submitting the form again.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	<!-- Fim Contato -->