/* global wmTest, translationsHash, wmL10nVisible, rtlLangs, portalSearchDomain */
/**
 * This code was used to localize the top-ten language links
 * for the A/B test titled "A/B test: browser language detection"
 *
 * Depends on a global wmStats object generated by controller.js
 * and written to site-defs.js
 *
 * A/B test documented here:
 * https://www.mediawiki.org/wiki/Wikipedia.org_Portal_A/B_testing
 */

( function ( mw, wmTest ) {

	var preferredLanguages = wmTest.userLangs,
		primaryLang = wmTest.primaryLang,
		topLinks = document.querySelectorAll( '.central-featured-lang' ),
		topLinksContainer = document.querySelector( '.central-featured' ),
		topLinkLangs,
		storedTranslationHash = mw.storage.get( 'translationHash' ),
		storedTranslations;

	/**
	 * Helper function to safely parse JSON an return empty string on error.
	 *
	 * @param {string} json
	 * @return {*}
	 */
	function safelyParseJSON( json ) {
		var parsed;
		try {
			parsed = JSON.parse( json );
		} catch ( e ) {
			parsed = '';
		}
		return parsed;
	}

	storedTranslations = safelyParseJSON( mw.storage.get( 'storedTranslations' ) ) || {};

	// Generate an array of language codes based on the lang attributes of the top-ten links.
	topLinkLangs = Array.prototype.map.call( topLinks, function ( link ) {
		return link.getAttribute( 'lang' );
	} );

	/**
	 * TranslationHash is a global variable that is a hash of all translation strings.
	 * it is generated during the build step and placed onto the page with mustache templates.
	 * For more info on how this hash is generated, see ../controller.js
	 * This hash is now stored in localstorage.
	 * If the localstorage version of the hash differs from the global variable,
	 * that means a translation has changed and we need to ajax in new translations.
	 */
	if ( storedTranslationHash !== translationsHash ) {
		mw.storage.set( 'translationHash', translationsHash );
		mw.storage.remove( 'storedTranslations' );
	}

	/**
	 * Merges the preferred language codes {@link #preferredLanguages} with the
	 * existing top ten languages {@link #topLinkLangs}.
	 * - If a preferred language exists in the top ten, it is moved to the top of the array.
	 * - If a preferred language doesn't exist, it is added to the array and the last language
	 * is removed.
	 *
	 * Manipulates the {@link #topLinkLangs} array.
	 */
	function mergeNewTopLinkLangs() {
		var i, pl, plIndex, plExists, plRightSpot;
		for ( i = 0; i < preferredLanguages.length; i++ ) {
			pl = preferredLanguages[ i ];
			plIndex = topLinkLangs.indexOf( pl );
			plExists = plIndex >= 0;
			plRightSpot = plIndex === i;

			if ( plExists ) {
				if ( !plRightSpot ) {
					topLinkLangs.splice( i, 0, topLinkLangs.splice( plIndex, 1 )[ 0 ] );
				}
			} else {
				topLinkLangs.splice( i, 0, pl );
				topLinkLangs.pop();
			}
		}
	}

	/**
	 * Manipulates the DOM of a top-ten item with new content.
	 * Essentially, instead of creating new elements, we move existing elements and
	 * replace their textContent and attributes with a different content.
	 *
	 * @param {HTMLElement} node A DOM Element from the top-ten links that will be modified.
	 * @param {Object} wikiInfo The info to modify the node with.
	 * @param {boolean} localizeVariant Whether we are only localizing to variant.
	 */
	function updateTopLinkDOM( node, wikiInfo, localizeVariant ) {
		var anchor = node.getElementsByTagName( 'a' )[ 0 ],
			elePages = node.getElementsByTagName( 'small' )[ 0 ],
			eleEntries = elePages.getElementsByTagName( 'span' )[ 0 ],
			eleCaption = node.getElementsByTagName( 'strong' )[ 0 ];

		anchor.setAttribute( 'id', 'js-link-box-' + wikiInfo.lang );
		anchor.setAttribute( 'data-slogan', wikiInfo.slogan || 'The Free Encyclopedia' );
		eleEntries.textContent = wikiInfo.entries || '';
		node.setAttribute( 'lang', wikiInfo.lang );

		if ( !localizeVariant ) {
			// Some language names are placed within HTML tags.
			// Strip the tags for the title attribute.
			var langNameStripped = wikiInfo.name.replace( /<\/?[^>]+(>|$)/g, '' );

			anchor.setAttribute( 'href', '//' + wikiInfo.url );
			anchor.setAttribute( 'title', langNameStripped + ' — ' + wikiInfo.siteName + ' — ' + ( wikiInfo.slogan || '' ) );
			// TODO: We may want to set `innerHTML = wikiInfo.name` instead as the rendered HTML did.
			eleCaption.textContent = langNameStripped;
			elePages.textContent = wikiInfo.numPages + '+ ';
			elePages.appendChild( eleEntries );
		} else {
			// FIXME: wikiInfo.name for the main code (e.g. zh) and variants (e.g. zh-hans) are not the same thing...
			anchor.setAttribute( 'title', eleCaption.textContent + ' — ' + wikiInfo.name + ' — ' + ( wikiInfo.slogan || '' ) );
		}
	}

	/**
	 * Renames the top link classes to appear correctly around the globe image.
	 * this should happen after the top links nodes have been reorganized.
	 */
	function reorganizeTopLinkClasses() {
		var topLink,
			topLinkLang,
			topLinkClass,
			correctClassName,
			topLinksCorrectLangs = true,
			i;

		topLinks = document.querySelectorAll( '.central-featured-lang' );

		for ( i = 0; i < topLinks.length && topLinksCorrectLangs === true; i++ ) {
			/**
			 * Get the main code, we want the lang attribute varied to zh-hans and zh-hant
			 * for Chinese users, because the font style for them are different.
			 */
			topLinkLang = topLinks[ i ].getAttribute( 'lang' ).split( '-' )[ 0 ];
			topLinksCorrectLangs = topLinkLangs.indexOf( topLinkLang ) >= 0;
		}

		for ( i = 0; i < topLinks.length; i++ ) {
			if ( topLinksCorrectLangs ) {
				topLink = topLinks[ i ];
				topLinkClass = topLink.className;
				correctClassName = 'central-featured-lang lang' + ( i + 1 );

				if ( topLinkClass !== correctClassName ) {
					topLink.className = correctClassName;
				}
			}
		}
	}

	/**
	 * Retrieves top-ten item info. via ajax.
	 * On every successful request, we update the top-link DOM, create the localized slogan, and
	 * reorganize the top-link classes. Each of these methods check to see if the expected
	 * (i.e. final) data exists before executing. This accomodates both synchronous and
	 * asynchronous execution.
	 *
	 * After a successful request, the data is appended to a localStorage variable to prevent
	 * subsequest ajax requests.
	 *
	 * @param {HTMLElement} node A DOM node that will be modified with new info upon ajax success.
	 * @param {string} lang Language code for which to get new wiki info.
	 * @param {boolean} localizeVariant Whether we are only localizing to variant.
	 */
	function getAjaxTranslation( node, lang, localizeVariant ) {

		var i18nReq = new XMLHttpRequest(),
			wikiInfo;

		i18nReq.open( 'GET', encodeURI( 'portal/' + portalSearchDomain + '/assets/l10n/' + lang + '-' + translationsHash + '.json' ), true );

		i18nReq.onload = function () {

			if ( i18nReq.status !== 200 ) {
				return;
			}

			wikiInfo = safelyParseJSON( this.responseText );

			if ( wikiInfo ) {
				updateTopLinkDOM( node, wikiInfo, localizeVariant );
				reorganizeTopLinkClasses();
				storedTranslations = safelyParseJSON( mw.storage.get( 'storedTranslations' ) ) || {};
				storedTranslations[ lang ] = wikiInfo;
				mw.storage.set( 'storedTranslations', JSON.stringify( storedTranslations ) );
			}
		};

		i18nReq.send();
	}

	/**
	 * Determines whether to ajax in new language info or use it from localStorage.
	 *
	 * @param {HTMLElement} node The DOM node that will be modified with new info.
	 * @param {string} lang The language code with which to modify the node.
	 * @param {boolean} localizeVariant Whether we are only localizing to variant.
	 */
	function localizeTopLink( node, lang, localizeVariant ) {
		var translations = storedTranslations;

		localizeVariant = localizeVariant || false;

		if ( translations[ lang ] ) {
			updateTopLinkDOM( node, translations[ lang ], localizeVariant );
		} else {
			getAjaxTranslation( node, lang, localizeVariant );
		}
	}

	/**
	 * Looks for a top-link DOM node that can be re-purposed with new content.
	 * Returns the first DOM node that does not have a lang attribute that is
	 * one of topLinkLangs.
	 *
	 * @return {HTMLElement} Node that can be reused with new content.
	 */
	function findReusableTopLink() {
		var reusableTopLink = null,
			topLinkLang,
			i;

		for ( i = topLinkLangs.length - 1; i >= 0 && reusableTopLink === null; i-- ) {
			topLinkLang = topLinks[ i ].getAttribute( 'lang' );
			if ( topLinkLangs.indexOf( topLinkLang ) < 0 ) {
				reusableTopLink = topLinks[ i ];
			}
		}
		return reusableTopLink;
	}

	/**
	 * Reorganizes the DOM order of top links based on the {@link #topLinkLangs} array.
	 * If a preferred language in `topLinkLangs` does not exist in
	 * the top ten, then the last node in the top ten is manipulated
	 * to contain the new language.
	 */
	function organizeTopLinks() {
		var i,
			topLinkLang,
			topLinkNode,
			topLinkNodeIndex,
			repurposedTopLink;

		for ( i = 0; i < topLinkLangs.length; i++ ) {

			topLinks = document.querySelectorAll( '.central-featured-lang' );
			topLinkLang = topLinkLangs[ i ];
			topLinkNode = document.querySelector( '.central-featured-lang[lang=' + topLinkLang + ']' );

			if ( topLinkNode ) {
				topLinkNodeIndex = Array.prototype.indexOf.call( topLinks, topLinkNode );
				if ( topLinkNodeIndex !== i ) {
					topLinksContainer.insertBefore( topLinkNode, topLinks[ i ] );
				}
				// Apply localization in variant when needed.
				if ( preferredLanguages[ 0 ] === 'zh' && topLinkNode.firstElementChild.classList.contains( 'localize-variant' ) ) {
					localizeTopLink( topLinkNode, primaryLang, true );
				}
			} else {
				repurposedTopLink = findReusableTopLink();
				localizeTopLink( repurposedTopLink, topLinkLang );
				topLinksContainer.insertBefore( repurposedTopLink, topLinks[ i ] );
			}
			( topLinkNode || repurposedTopLink ).setAttribute( 'dir', rtlLangs.indexOf( topLinkLang ) >= 0 ? 'rtl' : 'ltr' );
		}
	}

	// Skip if it took too long
	if ( wmL10nVisible.ready ) {
		return;
	}
	mergeNewTopLinkLangs();
	organizeTopLinks();
	reorganizeTopLinkClasses();

}( mw, wmTest ) );
