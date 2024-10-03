export default `<div class="bee-popup-container">
	<style>
		.bee-popup-container div,
		.bee-popup-container form,
		.bee-popup-container p {
			margin: 0;
			padding: 0
		}

		.bee-popup-container input {
			font-family: inherit;
			font-size: inherit;
			font-weight: inherit
		}

		.bee-popup-container {
			color: #000000;
			font-family: Arial, Helvetica Neue, Helvetica, sans-serif
		}

		.bee-popup-container * {
			box-sizing: border-box
		}

		.bee-popup-container a {
			color: #0068A5
		}

		.bee-popup-container p {
			margin: 0
		}

		.bee-popup-container .bee-popup-row {
			position: relative
		}

		.bee-popup-container .bee-popup-row-content {
			max-width: 500px;
			position: relative;
			margin: 0 auto;
			display: flex
		}

		.bee-popup-container .bee-popup-row-content .bee-popup-col-w12 {
			flex: 12
		}

		.bee-popup-form .bee-popup-form-row.bee-popup-form-row-multicolumn {
			display: flex
		}

		.bee-popup-form .bee-popup-form-row.bee-popup-form-row-multicolumn input:not([type=checkbox]):not([type=radio]),
		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 .bee-popup-form-row:not(.bee-popup-sidelabel) input:not([type=checkbox]):not([type=radio]) {
			width: 100%
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field {
			padding: 3px;
			display: flex;
			flex: 1;
			flex-wrap: wrap;
			align-items: center
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field.bee-popup-inline-field {
			flex-wrap: nowrap;
			align-items: flex-start;
			display: block
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field .bee-popup-form-option-wrapper {
			align-items: flex-start;
			display: inline-flex
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field .bee-popup-form-option-wrapper>input {
			margin: 0 0 0 3px
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field .bee-popup-form-option-wrapper>label {
			min-width: 0
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field input:not([type=checkbox]):not([type=radio]) {
			flex-grow: 1;
			font-family: inherit;
			font-size: inherit
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field input[type=checkbox]:not(:first-of-type) {
			margin-left: 15px
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field button {
			font-family: inherit;
			font-size: inherit
		}

		.bee-popup-form .bee-popup-form-row .bee-popup-field .bee-popup-button-container {
			flex-grow: 1
		}

		.bee-popup-form input[type=color] {
			border: none;
			height: 38px
		}

		.bee-popup-form input[type=color]::-webkit-color-swatch-wrapper {
			margin: 0;
			padding: 2px
		}

		.bee-popup-form input[type=color]::-webkit-color-swatch {
			margin: 0;
			padding: 0
		}

		.bee-popup-text {
			overflow-wrap: anywhere
		}

		@media (max-width:520px) {
			.bee-popup-form-row-multicolumn {
				display: block !important
			}

			.bee-popup-form form {
				width: 100% !important
			}

			.bee-popup-row-content:not(.no_stack) {
				display: block;
				max-width: 250px
			}
		}

		.bee-popup-row-1 {
			background-color: #ffffff;
			background-repeat: no-repeat;
			border-radius: 12px
		}

		.bee-popup-row-1 .bee-popup-row-content {
			background-repeat: no-repeat;
			color: #000000
		}

		.bee-popup-row-1 .bee-popup-col-1 {
			border-bottom: 0 solid transparent;
			border-left: 0 solid transparent;
			border-right: 0 solid transparent;
			border-top: 0 solid transparent;
			padding-bottom: 5px;
			padding-top: 5px
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-1 {
			margin-bottom: 0;
			margin-top: 0;
			padding: 24px 12px 12px
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 {
			font-family: inherit;
			font-size: 14px;
			font-weight: 400;
			padding: 10px;
			text-align: center
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 form {
			display: inline-block;
			width: 100%
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 div.label,
		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 label {
			color: #000000;
			letter-spacing: 0;
			line-height: 200%;
			text-align: left;
			display: block
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 div.label:not(.inline),
		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 label:not(.inline) {
			flex-basis: 100%
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 ::-webkit-input-placeholder {
			color: #000000
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 :-moz-placeholder {
			color: #000000
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 ::-moz-placeholder {
			color: #000000
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 :-ms-input-placeholder {
			color: #000000
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 .bee-popup-field>label:first-child,
		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 div.label {
			padding: 3px
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 .bee-popup-field.bee-popup-inline-field input[type=checkbox] {
			position: relative;
			color: purple;
			top: 8px
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 input:not([type=checkbox]):not([type=radio]):not([type=image]) {
			background-color: #FFFFFF;
			border: 1px solid #cccccc;
			border-radius: 8px;
			color: #000000;
			margin-bottom: 8px;
			padding: 8px;
			min-height: 44px
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 input:not([type=checkbox]):not([type=radio]):focus {
			outline-color: undefined
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 button {
			background-color: #000000;
			border-bottom: 0 solid transparent;
			border-left: 0 solid transparent;
			border-radius: 4px;
			border-right: 0px solid transparent;
			border-top: 0 solid transparent;
			color: #ffffff;
			cursor: pointer;
			letter-spacing: 0;
			line-height: 200%;
			padding: 5px 20px;
			width: 100%
		}

		.bee-popup-row-1 .bee-popup-col-1 .bee-popup-block-2 .bee-popup-button-container {
			padding-top: 10px;
			text-align: center
		}
	</style>
	<div class="bee-popup-rows-container">
		<div class="bee-popup-row bee-popup-row-1">
			<div class="bee-popup-row-content">
				<div class="bee-popup-col bee-popup-col-1 bee-popup-col-w12">
					<div class="bee-popup-block bee-popup-block-1 bee-popup-text">
						<div style="font-size: 14px; font-family: inherit, 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; line-height: 120%; color: #000000;" class="bee-popup-text-content">
							<p style=""></p>
							<div style="text-align: center; line-height: 14px;"><strong style=""><span style="font-size: 20px; line-height: 24px;">Subscribe to newsletter</span></strong></div>
							<p style=""></p>
						</div>
					</div>
					<div class="bee-popup-block bee-popup-block-2 bee-popup-form">
						<form accept-charset="UTF-8" action="http://example.com/read-form-script" autocomplete="on" enctype="multipart/form-data" method="post" target="_self">
							<div class="bee-popup-form-row bee-popup-form-row-multicolumn">
								<div class="bee-popup-field bee-popup-field-r0c0m1i1"><label for="r0c0m1i1">First name</label><input id="r0c0m1i1" name="first_name" type="text" /></div>
								<div class="bee-popup-field bee-popup-field-r0c0m1i1"><label for="r0c0m1i1">Last name</label><input id="r0c0m1i1" name="last_name" type="text" /></div>
							</div>
							<div class="bee-popup-form-row">
								<div class="bee-popup-field bee-popup-field-r0c0m1i2"><label for="r0c0m1i2">Email *</label><input id="r0c0m1i2" name="email" type="email" required="required" /></div>
							</div>
							<div class="bee-popup-form-row">
								<div class="bee-popup-field bee-popup-field-r0c0m1i3 bee-popup-inline-field"><span class="bee-popup-form-option-wrapper"><input id="r0c0m1i3" name="privacy" type="checkbox" required="required" /><label class="inline" for="r0c0m1i3">&nbsp;Accept privacy policy. <a href="https://beefree.io/pro/privacy.html">Read it here</a></label></span></div>
							</div>
							<div class="bee-popup-form-row bee-popup-form-row-multicolumn"><input id="r0c0m1i4" name="relay_anonymous_id" type="hidden" /><input id="r0c0m1i4" name="relay_form_type" type="hidden" value="subscription" /><input id="r0c0m1i4" name="relay_public_id" type="hidden" /></div>
							<div class="bee-popup-form-row">
								<div class="bee-popup-field bee-popup-field-r0c0m1i5">
									<div class="bee-popup-button-container"><button id="r0c0m1i5" name="submit" type="submit" value="Subscribe">Subscribe</button></div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;
