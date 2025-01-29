import { NextResponse } from "next/server"

const { match } = require("@formatjs/intl-localematcher")
const Negotiator = require("negotiator")

let locales = ['bn', 'en']
let defaultLocale = 'en'

const getLocale = (request) => {
    const acceptedLanguage = request.headers.get('accept-language') ?? undefined
    let headers = { 'accept-language': acceptedLanguage }
    let languages = new Negotiator({ headers }).languages()
    return match(languages, locales, defaultLocale)
}

export const middleware = (request) => {
    const pathname = request.nextUrl.pathname

    const pathNameIsMissingLocale = locales.every(locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`)

    if (pathNameIsMissingLocale) {
        const locale = getLocale(request)
        return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
    }
}

export const config = {
    matcher: [
        '/((?!api|assets|.*\\..*|_next).*)',
    ],
}