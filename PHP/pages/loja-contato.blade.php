		<!-- Loja Contato -->
		<div class="section section-sm section-both">
		  <div class="container">
			<div class="row">
			  <div class="col-md-5">
				<h3 class="title-md text-theme hr-left">Contact Form</h3>
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

			  <div class="col-md-5 col-md-offset-1">
				<h3 class="title-md text-theme hr-left">Get in touch</h3>
				<p class="text-theme lead">We'd love to here from you. Drop us a line if you have any questions. Lorem ipsum dolor sit am conse</p>
				<h3 class="title-md text-theme">The Office</h3>
				<ul class="list-unstyled list-md text-theme">
				  <li><i class="fa fa-map-marker fa-box"></i>Address: Some Address 247, NY</li>
				  <li><i class="fa fa-phone fa-box"></i>Phone: +371 9800 4893</li>
				  <li><i class="fa fa-envelope fa-box"></i>support@example.com</li>
				</ul>
				<h3 class="title-md text-theme">Business Hours</h3>
				<ul class="list-unstyled list-md text-theme">
				  <li><i class="fa fa-clock-o fa-box"></i>Monday - Friday 9am to 5pm</li>
				</ul>
			  </div>
			</div>
			<div class="row">
			  <div class="col-md-5">
				<h3 class="title-md text-theme hr-left" style="margin-botton">Mapa</h3>
				 <p class="text-theme lead">
					<div id="map"></div>
				</p>
			  </div>
			  <div class="col-md-5 col-md-offset-1">
			  <p class="text-theme lead" style="margin-top:52px">
				<img src="assets/images/Quadra C.jpg" width= "100%" height="250px" >
				</p>
			  </div>
			</div>
		  </div>	
		</div>
		<!-- Fim Contato -->