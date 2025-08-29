import { Question } from './types';

// Original 36 questions (Lite version)
export const QUESTIONS_LITE: Question[] = [
  // Economic Axis (6 questions)
  {
    id: 'econ_1',
    text: 'The UK government should have a larger role in managing the economy, even if this reduces business flexibility.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Tests preference for a larger state role (regulation/public ownership) versus market-led approaches.',
    stat: 'UK public sector expenditure was about 44% of GDP in 2022/23 (ONS).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicspending' }
    ]
  },
  {
    id: 'econ_2',
    text: 'Public services should be delivered by private companies rather than government departments.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Tests preference for private sector delivery versus public sector provision of services.',
    stat: 'Independent sector accounts for a minority share of NHS-delivered care (NHS Confederation, 2023).',
    sources: [
      { label: 'NHS Confederation', url: 'https://www.nhsconfed.org/publications/independent-sector-nhs' }
    ]
  },
  {
    id: 'econ_3',
    text: 'Raising the minimum wage faster than inflation is desirable, even if it increases costs for some employers.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Balances wage floors for workers against potential employment/cost impacts.',
    stat: 'National Living Wage for over-23s rose in April 2023 (Gov.uk).',
    sources: [
      { label: 'Gov.uk', url: 'https://www.gov.uk/national-minimum-wage-rates' }
    ]
  },
  {
    id: 'econ_4',
    text: 'Lower taxes are more important than funding public services.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Tests preference for lower taxation versus higher public spending.',
    stat: 'Main rate of UK corporation tax is 25% (from April 2023).',
    sources: [
      { label: 'HMRC', url: 'https://www.gov.uk/corporation-tax-rates' }
    ]
  },
  {
    id: 'econ_5',
    text: 'The private sector should handle most services currently provided by government.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Tests preference for private sector provision versus government provision of services.',
    stat: 'The UK has privatized many industries including telecoms, energy, and transport.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/publications/privatisation' }
    ]
  },
  {
    id: 'econ_6',
    text: 'The government should provide universal basic services like healthcare and education.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Tests preference for universal public services versus private provision.',
    stat: 'The NHS provides free healthcare to all UK residents.',
    sources: [
      { label: 'NHS', url: 'https://www.nhs.uk/about-us/' }
    ]
  },

  // Social Axis (6 questions)
  {
    id: 'social_1',
    text: 'Traditional gender roles (men as breadwinners, women as caregivers) are generally beneficial for society.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer traditional gender roles (men/women having specific societal roles) versus more flexible, non-traditional gender roles where people can choose their path regardless of gender. Currently the UK has moved toward more flexible roles.',
    stat: 'Women make up 47% of the UK workforce (ONS, 2023).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes' }
    ]
  },
  {
    id: 'social_2',
    text: 'Schools should actively promote diversity and inclusion, even if it means less focus on traditional academic subjects.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer schools focusing on traditional academic subjects versus actively teaching about diversity, inclusion, and social issues. Currently UK schools have some diversity education but focus mainly on core subjects.',
    stat: 'Schools must promote fundamental British values including democracy and mutual respect (DfE guidance).',
    sources: [
      { label: 'Department for Education', url: 'https://www.gov.uk/government/publications/promoting-fundamental-british-values-through-smsc' }
    ]
  },
  {
    id: 'social_3',
    text: 'Religious institutions should have a greater role in public life and policy-making.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer religious institutions having more influence in public policy versus keeping religion separate from government decisions. Currently the UK has some religious influence (Church of England bishops in Lords) but is largely secular.',
    stat: '26 Bishops sit in the House of Lords as Lords Spiritual.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/about/mps-and-lords/about-lords/lords-spiritual/' }
    ]
  },
  {
    id: 'social_4',
    text: 'Immigration has been beneficial for the UK economy and culture.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you view immigration as positive for the UK (economically and culturally) versus seeing it as potentially harmful. Currently the UK has significant immigration with mixed public opinion.',
    stat: 'Net migration to the UK was 606,000 in 2022 (ONS).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration' }
    ]
  },
  {
    id: 'social_5',
    text: 'The UK should be more accepting of different family structures (single parents, same-sex couples, etc.).',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer traditional family structures (married heterosexual couples) versus accepting diverse family types. Currently the UK legally recognizes various family structures.',
    stat: 'Same-sex marriage has been legal in England and Wales since 2014.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/private-lives/relationships/collections1/marriage-equality-bill-2013/' }
    ]
  },
  {
    id: 'social_6',
    text: 'Traditional British values and customs should be preserved and promoted.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer preserving traditional British customs and values versus allowing more cultural change and diversity. Currently the UK balances tradition with multiculturalism.',
    stat: 'The UK has a diverse population with 14% from ethnic minority backgrounds (Census 2021).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/ethnicity' }
    ]
  },

  // Authority Axis (6 questions)
  {
    id: 'auth_1',
    text: 'Collective security measures should be prioritized over individual freedoms.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer collective security (government measures to protect society) versus individual liberty (freedom to act as you choose). Currently the UK balances both with various security laws.',
    stat: 'The UK has extensive surveillance powers under the Investigatory Powers Act 2016.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.legislation.gov.uk/ukpga/2016/25/contents' }
    ]
  },
  {
    id: 'auth_2',
    text: 'The internet should remain largely unregulated, even if some harmful content exists.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer keeping the internet unregulated versus government regulation of online content. Currently the UK is introducing the Online Safety Bill.',
    stat: 'The Online Safety Bill aims to regulate social media and search engines, but many oppose this regulation.',
    sources: [
      { label: 'UK Parliament', url: 'https://bills.parliament.uk/bills/3137' }
    ]
  },
  {
    id: 'auth_3',
    text: 'Public order should be maintained, even if it means limiting protest rights.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer maintaining public order versus the right to protest (even if disruptive). Currently the UK allows peaceful protest but has laws against disruption.',
    stat: 'The Police, Crime, Sentencing and Courts Act 2022 introduced new restrictions on protests.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.legislation.gov.uk/ukpga/2022/32/contents' }
    ]
  },
  {
    id: 'auth_4',
    text: 'Individual privacy should be protected, even if it limits police powers to prevent crime.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer protecting individual privacy versus giving police more powers to prevent crime. Currently the UK police have significant powers but with some privacy protections.',
    stat: 'UK police have powers to stop and search, with 577,000 searches in 2021/22, but privacy advocates oppose these powers.',
    sources: [
      { label: 'Home Office', url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-31-march-2022' }
    ]
  },
  {
    id: 'auth_5',
    text: 'Society should regulate lifestyle choices to maintain social order.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer social conformity and regulation versus individual lifestyle choices. Currently the UK protects many individual rights but has some social regulations.',
    stat: 'The UK has strong protections for individual rights under the Human Rights Act 1998.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.legislation.gov.uk/ukpga/1998/42/contents' }
    ]
  },
  {
    id: 'auth_6',
    text: 'People should be free to express controversial opinions without government interference.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer freedom of expression versus government regulation of speech. Currently the UK protects free speech but has some restrictions on hate speech.',
    stat: 'The UK has strong free speech protections under Article 10 of the European Convention on Human Rights.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.legislation.gov.uk/ukpga/1998/42/schedule/1/part/I/chapter/9' }
    ]
  },

  // Sovereignty Axis (6 questions)
  {
    id: 'sovereign_1',
    text: 'The UK should prioritize international cooperation over national sovereignty.',
    axisTargets: [{ axis: 'sovereignty', weight: -1.0 }],
    rationale: 'This asks whether you prefer international cooperation (working with other countries) versus national sovereignty (UK making its own decisions). Currently the UK balances both post-Brexit.',
    stat: 'The UK remains a member of NATO, UN, G7, and other international organizations.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/organisations/foreign-commonwealth-development-office' }
    ]
  },
  {
    id: 'sovereign_2',
    text: 'The UK should accept more international laws and regulations, even if it limits domestic control.',
    axisTargets: [{ axis: 'sovereignty', weight: -1.0 }],
    rationale: 'This asks whether you prefer accepting international laws (for global cooperation) versus maintaining UK control over laws. Currently the UK follows some international laws but has regained control over many areas post-Brexit.',
    stat: 'The UK remains bound by international treaties like the European Convention on Human Rights.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/parliament-and-europe/overview/britain-and-europe/' }
    ]
  },
  {
    id: 'sovereign_3',
    text: 'The UK should be more independent in its foreign policy decisions.',
    axisTargets: [{ axis: 'sovereignty', weight: 1.0 }],
    rationale: 'This asks whether you prefer UK making independent foreign policy decisions versus coordinating with allies. Currently the UK coordinates with allies but makes independent decisions.',
    stat: 'The UK maintains close ties with the US and European allies while pursuing independent policies.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/publications/global-britain-in-a-competitive-age-the-integrated-review-of-security-defence-development-and-foreign-policy' }
    ]
  },
  {
    id: 'sovereign_4',
    text: 'The UK should accept more international trade agreements, even if they limit domestic policy choices.',
    axisTargets: [{ axis: 'sovereignty', weight: 1.0 }],
    rationale: 'This asks whether you prefer international trade agreements (for economic benefits) versus maintaining UK control over trade policy. Currently the UK is negotiating new trade deals post-Brexit.',
    stat: 'The UK has signed trade agreements with 71 countries since leaving the EU.',
    sources: [
      { label: 'Department for Business and Trade', url: 'https://www.gov.uk/guidance/uk-trade-agreements-with-non-eu-countries' }
    ]
  },
  {
    id: 'sovereign_5',
    text: 'The UK should prioritize its own interests over global humanitarian concerns.',
    axisTargets: [{ axis: 'sovereignty', weight: 1.0 }],
    rationale: 'This asks whether you prefer the UK focusing on its own interests versus helping with global humanitarian issues. Currently the UK provides significant foreign aid but prioritizes national interests.',
    stat: 'The UK spent £12.8 billion on official development assistance in 2022.',
    sources: [
      { label: 'Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/government/statistics/statistics-on-international-development-final-uk-aid-spend-2022' }
    ]
  },
  {
    id: 'sovereign_6',
    text: 'The UK should be more involved in international organizations and agreements.',
    axisTargets: [{ axis: 'sovereignty', weight: -1.0 }],
    rationale: 'This asks whether you prefer the UK being more involved in international organizations versus being more independent. Currently the UK participates in many international organizations but has reduced EU involvement.',
    stat: 'The UK is a founding member of the UN, NATO, and Commonwealth.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/organisations/foreign-commonwealth-development-office' }
    ]
  },

  // Environment Axis (6 questions)
  {
    id: 'env_1',
    text: 'Environmental protection should be prioritized over economic growth.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'This asks whether you prefer protecting the environment (even if it slows economic growth) versus prioritizing economic growth. Currently the UK has Net Zero targets but balances environmental and economic concerns.',
    stat: 'The UK has committed to Net Zero emissions by 2050.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/publications/net-zero-strategy' }
    ]
  },
  {
    id: 'env_2',
    text: 'The UK should invest more in renewable energy, even if it increases energy costs.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'This asks whether you prefer investing in renewable energy (even if more expensive) versus keeping energy costs low. Currently the UK is expanding renewables but energy costs are a concern.',
    stat: 'Renewables generated 41.5% of UK electricity in 2022.',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/statistics/energy-trends-march-2023' }
    ]
  },
  {
    id: 'env_3',
    text: 'The UK should reduce its carbon emissions more aggressively, even if it affects the economy.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'This asks whether you prefer faster carbon reduction (even if it hurts the economy) versus a more gradual approach. Currently the UK has ambitious targets but balances economic impacts.',
    stat: 'UK emissions have fallen 48% since 1990, faster than most major economies.',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/statistics/final-uk-emissions-estimates' }
    ]
  },
  {
    id: 'env_4',
    text: 'The UK should prioritize energy security over environmental concerns.',
    axisTargets: [{ axis: 'environment', weight: -1.0 }],
    rationale: 'This asks whether you prefer ensuring reliable energy supply versus environmental protection. Currently the UK balances both but energy security has become more important.',
    stat: 'The UK imports 40% of its energy needs.',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/statistics/energy-trends-march-2023' }
    ]
  },
  {
    id: 'env_5',
    text: 'The UK should expand fossil fuel production to reduce dependence on imports.',
    axisTargets: [{ axis: 'environment', weight: -1.0 }],
    rationale: 'This asks whether you prefer expanding UK fossil fuel production (for energy security) versus reducing fossil fuel use (for climate). Currently the UK is reducing fossil fuel use but still produces some.',
    stat: 'The UK still produces oil and gas from the North Sea, though production is declining.',
    sources: [
      { label: 'North Sea Transition Authority', url: 'https://www.nstauthority.co.uk/' }
    ]
  },
  {
    id: 'env_6',
    text: 'The UK should invest more in nuclear energy as a low-carbon solution.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'This asks whether you prefer expanding nuclear power (low-carbon but with safety/radioactive waste concerns) versus focusing on renewable energy sources (wind, solar) for reducing emissions. Currently the UK has some nuclear power but is expanding renewables.',
    stat: 'Nuclear provides about 15% of UK electricity, with plans for new reactors.',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/publications/british-energy-security-strategy' }
    ]
  },

  // Welfare Axis (6 questions)
  {
    id: 'welfare_1',
    text: 'The UK should expand universal benefits, even if it means higher taxes.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer expanding universal benefits (available to everyone) versus keeping taxes lower. Currently the UK has some universal benefits but many are means-tested.',
    stat: 'The UK spends about £250 billion annually on social protection (ONS).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicspending' }
    ]
  },
  {
    id: 'welfare_2',
    text: 'The NHS should be expanded to cover more services, even if it requires more funding.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer expanding NHS services (even if more expensive) versus keeping NHS funding lower. Currently the NHS is under pressure but remains free at point of use.',
    stat: 'The NHS budget is about £180 billion annually.',
    sources: [
      { label: 'NHS England', url: 'https://www.england.nhs.uk/about/nhs-health-organisations/' }
    ]
  },
  {
    id: 'welfare_3',
    text: 'The UK should provide more generous unemployment benefits, even if it reduces work incentives.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer more generous unemployment benefits (to help people) versus keeping benefits lower (to encourage work). Currently UK benefits are modest by European standards.',
    stat: 'Universal Credit basic allowance is £334.91 per month for single people over 25.',
    sources: [
      { label: 'Gov.uk', url: 'https://www.gov.uk/universal-credit/what-youll-get' }
    ]
  },
  {
    id: 'welfare_4',
    text: 'The UK should provide free university education, even if it means higher taxes.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer free university education (even if higher taxes) versus the current system where students pay fees. Currently English students pay up to £9,250 per year in fees.',
    stat: 'University tuition fees in England are up to £9,250 per year.',
    sources: [
      { label: 'Gov.uk', url: 'https://www.gov.uk/student-finance/new-fulltime-students' }
    ]
  },
  {
    id: 'welfare_5',
    text: 'The UK should provide more support for childcare, even if it requires significant public funding.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer more government support for childcare (even if expensive) versus leaving childcare costs to families. Currently the UK provides some childcare support but costs remain high.',
    stat: 'The UK provides 30 hours of free childcare for 3-4 year olds of working parents.',
    sources: [
      { label: 'Gov.uk', url: 'https://www.gov.uk/help-with-childcare-costs/free-childcare-and-education-for-2-to-4-year-olds' }
    ]
  },
  {
    id: 'welfare_6',
    text: 'The UK should expand social housing, even if it requires significant public investment.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer expanding social housing (government-provided affordable housing) versus relying on the private market for all housing. Currently the UK has limited social housing with long waiting lists.',
    stat: 'There are 1.2 million households on social housing waiting lists in England.',
    sources: [
      { label: 'Department for Levelling Up, Housing and Communities', url: 'https://www.gov.uk/government/statistics/social-housing-lettings-in-england-april-2021-to-march-2022' }
    ]
  }
];

// Full 60 questions (Full version) - includes all questions from the original file
export const QUESTIONS_FULL: Question[] = [
  // Economic Axis (10 questions)
  {
    id: 'econ_1',
    text: 'The UK government should expand its role in managing the economy, even if this reduces business flexibility.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Tests preference for a larger state role (regulation/public ownership) versus market-led approaches.',
    stat: 'UK public sector expenditure was about 44% of GDP in 2022/23 (ONS).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicspending' }
    ]
  },
  {
    id: 'econ_2',
    text: 'Contracting public services to private providers can improve value for money, even if profit is involved.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Assesses openness to private provision in public services versus public-only delivery.',
    stat: 'Independent sector accounts for a minority share of NHS-delivered care (NHS Confederation, 2023).',
    sources: [
      { label: 'NHS Confederation', url: 'https://www.nhsconfed.org/publications/independent-sector-nhs' }
    ]
  },
  {
    id: 'econ_3',
    text: 'Raising the minimum wage faster than inflation is desirable, even if it increases costs for some employers.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Balances wage floors for workers against potential employment/cost impacts.',
    stat: 'National Living Wage for over-23s rose in April 2023 (Gov.uk).',
    sources: [
      { label: 'Gov.uk', url: 'https://www.gov.uk/national-minimum-wage-rates' }
    ]
  },
  {
    id: 'econ_4',
    text: 'Reducing tax rates generally encourages growth and investment, even if it means less revenue for public services.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Tests preference for lower taxes versus funding capacity for public services.',
    stat: 'Main rate of UK corporation tax is 25% (from April 2023).',
    sources: [
      { label: 'HMRC', url: 'https://www.gov.uk/corporation-tax-rates' }
    ]
  },
  {
    id: 'econ_5',
    text: 'Greater political oversight of the Bank of England would improve accountability, even if it risks more short-term decisions.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Independence vs. political control in monetary policy.',
    stat: 'The Bank has been operationally independent since 1997.',
    sources: [
      { label: 'Bank of England', url: 'https://www.bankofengland.co.uk/about/people/independence' }
    ]
  },
  {
    id: 'econ_6',
    text: 'Reducing business regulation would benefit consumers and growth, even if some protections are weakened.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Fewer rules may spur activity but reduce certain safeguards.',
    stat: 'The UK operates numerous sector regulators and codes (BRE overview).',
    sources: [
      { label: 'Better Regulation Executive', url: 'https://www.gov.uk/government/organisations/better-regulation-executive' }
    ]
  },
  {
    id: 'econ_7',
    text: 'High earners should contribute a larger share of their income in taxes, even if this discourages investment.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Progressive taxation vs. economic incentive effects.',
    stat: 'The top 10% of income taxpayers contributed over 60% of total income tax in 2021/22 (HMRC).',
    sources: [
      { label: 'HMRC', url: 'https://www.gov.uk/government/statistics/income-tax-distribution-statistics' }
    ]
  },
  {
    id: 'econ_8',
    text: 'Large corporations should face stricter windfall or excess profits taxes, even if this reduces shareholder returns.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Redistribution through profit taxation vs. corporate reinvestment and investor returns.',
    stat: 'UK introduced an Energy Profits Levy in 2022 targeting oil and gas firms.',
    sources: [
      { label: 'HM Treasury', url: 'https://www.gov.uk/government/publications/energy-profits-levy' }
    ]
  },
  {
    id: 'econ_9',
    text: 'Essential infrastructure (rail, energy, water) should be publicly owned, even if it increases state spending.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Public ownership and control vs. private efficiency and investment.',
    stat: 'Most UK rail operations are privately run under government contracts.',
    sources: [
      { label: 'House of Commons Library', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-6521/' }
    ]
  },
  {
    id: 'econ_10',
    text: 'Cutting red tape for small businesses should be a priority, even if consumer or worker protections are reduced.',
    axisTargets: [{ axis: 'economic', weight: 1.0 }],
    rationale: 'Encouraging small enterprise vs. maintaining strong protections.',
    stat: 'SMEs account for 61% of UK private sector employment (BEIS, 2022).',
    sources: [
      { label: 'BEIS', url: 'https://www.gov.uk/government/statistics/business-population-estimates-2022' }
    ]
  },

  // Social Axis (10 questions)
  {
    id: 'social_1',
    text: 'Traditional gender roles (men as breadwinners, women as caregivers) are generally beneficial for society.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer traditional gender roles (men/women having specific societal roles) versus more flexible, non-traditional gender roles where people can choose their path regardless of gender. Currently the UK has moved toward more flexible roles.',
    stat: 'Women make up 47% of the UK workforce (ONS, 2023).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes' }
    ]
  },
  {
    id: 'social_2',
    text: 'Schools should actively promote diversity and inclusion, even if it means less focus on traditional academic subjects.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer schools focusing on traditional academic subjects versus actively teaching about diversity, inclusion, and social issues. Currently UK schools have some diversity education but focus mainly on core subjects.',
    stat: 'Schools must promote fundamental British values including democracy and mutual respect (DfE guidance).',
    sources: [
      { label: 'Department for Education', url: 'https://www.gov.uk/government/publications/promoting-fundamental-british-values-through-smsc' }
    ]
  },
  {
    id: 'social_3',
    text: 'Religious institutions should have a greater role in public life and policy-making.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer religious institutions having more influence in public policy versus keeping religion separate from government decisions. Currently the UK has some religious influence (Church of England bishops in Lords) but is largely secular.',
    stat: '26 Bishops sit in the House of Lords as Lords Spiritual.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/about/mps-and-lords/about-lords/lords-spiritual/' }
    ]
  },
  {
    id: 'social_4',
    text: 'Immigration has been beneficial for the UK economy and culture.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you view immigration as positive for the UK (economically and culturally) versus seeing it as potentially harmful. Currently the UK has significant immigration with mixed public opinion.',
    stat: 'Net migration to the UK was 606,000 in 2022 (ONS).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration' }
    ]
  },
  {
    id: 'social_5',
    text: 'The UK should be more accepting of different family structures (single parents, same-sex couples, etc.).',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer traditional family structures (married heterosexual couples) versus accepting diverse family types. Currently the UK legally recognizes various family structures.',
    stat: 'Same-sex marriage has been legal in England and Wales since 2014.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/private-lives/relationships/collections1/marriage-equality-bill-2013/' }
    ]
  },
  {
    id: 'social_6',
    text: 'Traditional British values and customs should be preserved and promoted.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'This asks whether you prefer preserving traditional British customs and values versus allowing more cultural change and diversity. Currently the UK balances tradition with multiculturalism.',
    stat: 'The UK has a diverse population with 14% from ethnic minority backgrounds (Census 2021).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/ethnicity' }
    ]
  },
  {
    id: 'social_7',
    text: 'Schools should teach that same-sex relationships are equal to opposite-sex relationships in RSE, even if some parents object.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'Active equality framing vs. parental objection sensitivities.',
    stat: 'Same-sex marriage has been legal across Great Britain since 2014.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/private-lives/relationships/collections1/marriage-act-2013/' }
    ]
  },
  {
    id: 'social_8',
    text: 'Religious institutions should have less influence in public life to maintain a clearer separation of faith and state.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'Secularism preference vs. established religious roles.',
    stat: 'A growing share of the UK population identifies with no religion (2021 Census).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/religion' }
    ]
  },
  {
    id: 'social_9',
    text: 'People should be free to pursue any role regardless of gender expectations, even if this challenges traditional norms.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'Flexibility in gender roles vs. tradition.',
    stat: 'Women constitute roughly a third of MPs (UK Parliament, 2023).',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/mps-lords-and-offices/mps/' }
    ]
  },
  {
    id: 'social_10',
    text: 'Policies should prioritise preserving traditional family structures, even if this reduces emphasis on newer family forms.',
    axisTargets: [{ axis: 'social', weight: 1.0 }],
    rationale: 'Preference for traditional family policy vs. plural models.',
    stat: 'ONS reports diverse family structures including single-parent and cohabiting households (latest release).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/families' }
    ]
  },

  // Authority Axis (10 questions)
  {
    id: 'auth_1',
    text: 'Individual freedoms should be prioritized over collective security measures.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer individual liberty (freedom to act as you choose) versus collective security (government measures to protect society). Currently the UK balances both with various security laws.',
    stat: 'The UK has extensive surveillance powers under the Investigatory Powers Act 2016.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.legislation.gov.uk/ukpga/2016/25/contents' }
    ]
  },
  {
    id: 'auth_2',
    text: 'The government should have more power to monitor and regulate online content.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer government regulation of online content (to prevent harm) versus keeping the internet largely unregulated. Currently the UK is introducing the Online Safety Bill.',
    stat: 'The Online Safety Bill aims to regulate social media and search engines.',
    sources: [
      { label: 'UK Parliament', url: 'https://bills.parliament.uk/bills/3137' }
    ]
  },
  {
    id: 'auth_3',
    text: 'Citizens should have the right to protest even if it disrupts public order.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer the right to protest (even if disruptive) versus maintaining public order. Currently the UK allows peaceful protest but has laws against disruption.',
    stat: 'The Police, Crime, Sentencing and Courts Act 2022 introduced new restrictions on protests.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.legislation.gov.uk/ukpga/2022/32/contents' }
    ]
  },
  {
    id: 'auth_4',
    text: 'The police should have more powers to prevent crime, even if it means less privacy.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer giving police more powers (to prevent crime) versus protecting individual privacy. Currently the UK police have significant powers but with some privacy protections.',
    stat: 'UK police have powers to stop and search, with 577,000 searches in 2021/22.',
    sources: [
      { label: 'Home Office', url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-31-march-2022' }
    ]
  },
  {
    id: 'auth_5',
    text: 'Schools should have more authority to discipline students, even if it limits student rights.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer schools having more disciplinary powers versus protecting student rights. Currently UK schools have disciplinary powers but must respect student rights.',
    stat: 'Schools can exclude students for serious misconduct, with 5,800 permanent exclusions in 2021/22.',
    sources: [
      { label: 'Department for Education', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/permanent-and-fixed-period-exclusions-in-england' }
    ]
  },
  {
    id: 'auth_6',
    text: 'The government should have more control over the media to prevent misinformation.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'This asks whether you prefer government regulation of media (to prevent misinformation) versus media freedom. Currently the UK has some media regulation but strong press freedom.',
    stat: 'Ofcom regulates UK broadcasting, but print media is self-regulated.',
    sources: [
      { label: 'Ofcom', url: 'https://www.ofcom.org.uk/about-ofcom' }
    ]
  },
  {
    id: 'auth_7',
    text: 'More state surveillance (e.g., data collection, monitoring) is justified for public safety, even if privacy is reduced.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'Security emphasis vs. civil liberties.',
    stat: 'The UK has extensive surveillance infrastructure (various estimates for CCTV coverage).',
    sources: [
      { label: 'British Security Industry Association', url: 'https://www.bsia.co.uk/' }
    ]
  },
  {
    id: 'auth_8',
    text: 'The law should protect the widest possible range of lawful speech online, even if some people find it offensive.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'Speech protection vs. regulation for harm mitigation.',
    stat: 'Debate continues following the Online Safety Act (2023).',
    sources: [
      { label: 'UK Parliament', url: 'https://bills.parliament.uk/bills/3137' }
    ]
  },
  {
    id: 'auth_9',
    text: 'Police should have wider powers (e.g., stop and search) in high-crime areas, even if this increases the risk of profiling.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'Public order tools vs. equal treatment/civil liberties concerns.',
    stat: 'Police numbers and powers are set nationally with local oversight (Home Office stats).',
    sources: [
      { label: 'Home Office', url: 'https://www.gov.uk/government/statistics/police-workforce-england-and-wales-31-march-2023' }
    ]
  },
  {
    id: 'auth_10',
    text: 'Protests that seriously disrupt essential services should face tighter limits, even if this restricts some protest tactics.',
    axisTargets: [{ axis: 'authority', weight: 1.0 }],
    rationale: 'Balancing protest rights with public order and continuity of services.',
    stat: 'Peaceful protest is protected, subject to public order legislation (HRA/ECHR context).',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/business/publications/research/key-issues-for-the-new-parliament/protecting-rights/protest-rights/' }
    ]
  },

  // Sovereignty Axis (10 questions)
  {
    id: 'sovereign_1',
    text: 'The UK should prioritize international cooperation over national sovereignty.',
    axisTargets: [{ axis: 'sovereignty', weight: -1.0 }],
    rationale: 'This asks whether you prefer international cooperation (working with other countries) versus national sovereignty (UK making its own decisions). Currently the UK balances both post-Brexit.',
    stat: 'The UK remains a member of NATO, UN, G7, and other international organizations.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/organisations/foreign-commonwealth-development-office' }
    ]
  },
  {
    id: 'sovereign_2',
    text: 'The UK should accept more international laws and regulations, even if it limits domestic control.',
    axisTargets: [{ axis: 'sovereignty', weight: -1.0 }],
    rationale: 'This asks whether you prefer accepting international laws (for global cooperation) versus maintaining UK control over laws. Currently the UK follows some international laws but has regained control over many areas post-Brexit.',
    stat: 'The UK remains bound by international treaties like the European Convention on Human Rights.',
    sources: [
      { label: 'UK Parliament', url: 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/parliament-and-europe/overview/britain-and-europe/' }
    ]
  },
  {
    id: 'sovereign_3',
    text: 'The UK should be more independent in its foreign policy decisions.',
    axisTargets: [{ axis: 'sovereignty', weight: 1.0 }],
    rationale: 'This asks whether you prefer UK making independent foreign policy decisions versus coordinating with allies. Currently the UK coordinates with allies but makes independent decisions.',
    stat: 'The UK maintains close ties with the US and European allies while pursuing independent policies.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/publications/global-britain-in-a-competitive-age-the-integrated-review-of-security-defence-development-and-foreign-policy' }
    ]
  },
  {
    id: 'sovereign_4',
    text: 'The UK should accept more international trade agreements, even if they limit domestic policy choices.',
    axisTargets: [{ axis: 'sovereignty', weight: -1.0 }],
    rationale: 'This asks whether you prefer international trade agreements (for economic benefits) versus maintaining UK control over trade policy. Currently the UK is negotiating new trade deals post-Brexit.',
    stat: 'The UK has signed trade agreements with 71 countries since leaving the EU.',
    sources: [
      { label: 'Department for Business and Trade', url: 'https://www.gov.uk/guidance/uk-trade-agreements-with-non-eu-countries' }
    ]
  },
  {
    id: 'sovereign_5',
    text: 'The UK should prioritize its own interests over global humanitarian concerns.',
    axisTargets: [{ axis: 'sovereignty', weight: 1.0 }],
    rationale: 'This asks whether you prefer the UK focusing on its own interests versus helping with global humanitarian issues. Currently the UK provides significant foreign aid but prioritizes national interests.',
    stat: 'The UK spent £12.8 billion on official development assistance in 2022.',
    sources: [
      { label: 'Foreign, Commonwealth & Development Office', url: 'https://www.gov.uk/government/statistics/statistics-on-international-development-final-uk-aid-spend-2022' }
    ]
  },
  {
    id: 'sovereign_6',
    text: 'The UK should be more involved in international organizations and agreements.',
    axisTargets: [{ axis: 'sovereignty', weight: -1.0 }],
    rationale: 'This asks whether you prefer the UK being more involved in international organizations versus being more independent. Currently the UK participates in many international organizations but has reduced EU involvement.',
    stat: 'The UK is a founding member of the UN, NATO, and Commonwealth.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/organisations/foreign-commonwealth-development-office' }
    ]
  },
  {
    id: 'sovereign_7',
    text: 'The UK should seek closer economic and security cooperation with the EU, even if it means aligning with more EU rules.',
    axisTargets: [{ axis: 'sovereignty', weight: -1.0 }],
    rationale: 'Cooperation benefits vs. rule-alignment and autonomy costs.',
    stat: 'The UK left the EU in January 2020; cooperation continues via agreements.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/brexit' }
    ]
  },
  {
    id: 'sovereign_8',
    text: 'The UK should prioritise national interests over international cooperation, even if this reduces our influence abroad.',
    axisTargets: [{ axis: 'sovereignty', weight: 1.0 }],
    rationale: 'National primacy vs. multilateral engagement and influence.',
    stat: 'The UK participates in numerous bilateral and multilateral arrangements.',
    sources: [
      { label: 'UK Parliament', url: 'https://researchbriefings.files.parliament.uk/documents/SN06643/SN06643.pdf' }
    ]
  },
  {
    id: 'sovereign_9',
    text: 'Securing new international trade agreements should be a priority, even if some domestic industries face more competition.',
    axisTargets: [{ axis: 'sovereignty', weight: 1.0 }],
    rationale: 'Open trade vs. protection of local sectors.',
    stat: 'The UK has rolled over or signed trade deals with many non-EU countries since 2020.',
    sources: [
      { label: 'Department for Business and Trade', url: 'https://www.gov.uk/guidance/uk-trade-agreements-with-non-eu-countries' }
    ]
  },
  {
    id: 'sovereign_10',
    text: 'The UK should exercise tighter control over immigration and borders, even if it reduces labour supply in some sectors.',
    axisTargets: [{ axis: 'sovereignty', weight: 1.0 }],
    rationale: 'Border control vs. economic and sectoral labour needs.',
    stat: 'Net migration flows vary year to year (ONS migration statistics).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration' }
    ]
  },

  // Environment Axis (10 questions)
  {
    id: 'env_1',
    text: 'Environmental protection should be prioritized over economic growth.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'This asks whether you prefer protecting the environment (even if it slows economic growth) versus prioritizing economic growth. Currently the UK has Net Zero targets but balances environmental and economic concerns.',
    stat: 'The UK has committed to Net Zero emissions by 2050.',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/publications/net-zero-strategy' }
    ]
  },
  {
    id: 'env_2',
    text: 'The UK should invest more in renewable energy, even if it increases energy costs.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'This asks whether you prefer investing in renewable energy (even if more expensive) versus keeping energy costs low. Currently the UK is expanding renewables but energy costs are a concern.',
    stat: 'Renewables generated 41.5% of UK electricity in 2022.',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/statistics/energy-trends-march-2023' }
    ]
  },
  {
    id: 'env_3',
    text: 'The UK should reduce its carbon emissions more aggressively, even if it affects the economy.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'This asks whether you prefer faster carbon reduction (even if it hurts the economy) versus a more gradual approach. Currently the UK has ambitious targets but balances economic impacts.',
    stat: 'UK emissions have fallen 48% since 1990, faster than most major economies.',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/statistics/final-uk-emissions-estimates' }
    ]
  },
  {
    id: 'env_4',
    text: 'The UK should prioritize energy security over environmental concerns.',
    axisTargets: [{ axis: 'environment', weight: -1.0 }],
    rationale: 'This asks whether you prefer ensuring reliable energy supply versus environmental protection. Currently the UK balances both but energy security has become more important.',
    stat: 'The UK imports 40% of its energy needs.',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/statistics/energy-trends-march-2023' }
    ]
  },
  {
    id: 'env_5',
    text: 'The UK should expand fossil fuel production to reduce dependence on imports.',
    axisTargets: [{ axis: 'environment', weight: -1.0 }],
    rationale: 'This asks whether you prefer expanding UK fossil fuel production (for energy security) versus reducing fossil fuel use (for climate). Currently the UK is reducing fossil fuel use but still produces some.',
    stat: 'The UK still produces oil and gas from the North Sea, though production is declining.',
    sources: [
      { label: 'North Sea Transition Authority', url: 'https://www.nstauthority.co.uk/' }
    ]
  },
  {
    id: 'env_6',
    text: 'The UK should invest more in nuclear energy as a low-carbon solution.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'This asks whether you prefer expanding nuclear power (low-carbon but with safety/radioactive waste concerns) versus focusing on renewable energy sources (wind, solar) for reducing emissions. Currently the UK has some nuclear power but is expanding renewables.',
    stat: 'Nuclear provides about 15% of UK electricity, with plans for new reactors.',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/publications/british-energy-security-strategy' }
    ]
  },
  {
    id: 'env_7',
    text: 'Climate change should be a top government spending priority, even if it slows other programmes.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'Decarbonisation priority vs. competing fiscal priorities.',
    stat: 'UK policy targets net zero greenhouse gas emissions by 2050 (Gov.uk).',
    sources: [
      { label: 'UK Government', url: 'https://www.gov.uk/government/publications/net-zero-strategy' }
    ]
  },
  {
    id: 'env_8',
    text: 'Policies that boost economic growth should proceed even if they delay emissions reductions.',
    axisTargets: [{ axis: 'environment', weight: -1.0 }],
    rationale: 'Growth and jobs vs. pace of decarbonisation.',
    stat: 'UK GDP growth rates vary; latest annual data available from ONS.',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp' }
    ]
  },
  {
    id: 'env_9',
    text: 'Public support for renewable energy (e.g., subsidies or contracts) should increase, even if it raises bills in the short term.',
    axisTargets: [{ axis: 'environment', weight: 1.0 }],
    rationale: 'Accelerating the transition vs. near-term affordability.',
    stat: 'Renewables generated a substantial share of UK electricity in 2022 (DESNZ).',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/statistics/energy-trends-march-2023' }
    ]
  },
  {
    id: 'env_10',
    text: 'Energy security should be prioritised over faster emissions cuts, even if total emissions fall more slowly.',
    axisTargets: [{ axis: 'environment', weight: -1.0 }],
    rationale: 'Reliability/affordability vs. pace of decarbonisation.',
    stat: 'The UK imports a significant portion of its energy (DESNZ energy trends).',
    sources: [
      { label: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/statistics/energy-trends-march-2023' }
    ]
  },

  // Welfare Axis (10 questions)
  {
    id: 'welfare_1',
    text: 'The UK should expand universal benefits, even if it means higher taxes.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer expanding universal benefits (available to everyone) versus keeping taxes lower. Currently the UK has some universal benefits but many are means-tested.',
    stat: 'The UK spends about £250 billion annually on social protection (ONS).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicspending' }
    ]
  },
  {
    id: 'welfare_2',
    text: 'The NHS should be expanded to cover more services, even if it requires more funding.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer expanding NHS services (even if more expensive) versus keeping NHS funding lower. Currently the NHS is under pressure but remains free at point of use.',
    stat: 'The NHS budget is about £180 billion annually.',
    sources: [
      { label: 'NHS England', url: 'https://www.england.nhs.uk/about/nhs-health-organisations/' }
    ]
  },
  {
    id: 'welfare_3',
    text: 'The UK should provide more generous unemployment benefits, even if it reduces work incentives.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer more generous unemployment benefits (to help people) versus keeping benefits lower (to encourage work). Currently UK benefits are modest by European standards.',
    stat: 'Universal Credit basic allowance is £334.91 per month for single people over 25.',
    sources: [
      { label: 'Gov.uk', url: 'https://www.gov.uk/universal-credit/what-youll-get' }
    ]
  },
  {
    id: 'welfare_4',
    text: 'The UK should provide free university education, even if it means higher taxes.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer free university education (even if higher taxes) versus the current system where students pay fees. Currently English students pay up to £9,250 per year in fees.',
    stat: 'University tuition fees in England are up to £9,250 per year.',
    sources: [
      { label: 'Gov.uk', url: 'https://www.gov.uk/student-finance/new-fulltime-students' }
    ]
  },
  {
    id: 'welfare_5',
    text: 'The UK should provide more support for childcare, even if it requires significant public funding.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer more government support for childcare (even if expensive) versus leaving childcare costs to families. Currently the UK provides some childcare support but costs remain high.',
    stat: 'The UK provides 30 hours of free childcare for 3-4 year olds of working parents.',
    sources: [
      { label: 'Gov.uk', url: 'https://www.gov.uk/help-with-childcare-costs/free-childcare-and-education-for-2-to-4-year-olds' }
    ]
  },
  {
    id: 'welfare_6',
    text: 'The UK should expand social housing, even if it requires significant public investment.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'This asks whether you prefer expanding social housing (government-provided affordable housing) versus relying on the private market for all housing. Currently the UK has limited social housing with long waiting lists.',
    stat: 'There are 1.2 million households on social housing waiting lists in England.',
    sources: [
      { label: 'Department for Levelling Up, Housing and Communities', url: 'https://www.gov.uk/government/statistics/social-housing-lettings-in-england-april-2021-to-march-2022' }
    ]
  },
  {
    id: 'welfare_7',
    text: 'A Universal Basic Income should replace parts of the current benefits system, even if it requires higher taxes.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'Income floor vs. fiscal cost and work incentives.',
    stat: 'Social protection spending totalled hundreds of billions in 2022/23 (ONS).',
    sources: [
      { label: 'Office for National Statistics', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicspending' }
    ]
  },
  {
    id: 'welfare_8',
    text: 'Most working-age benefits should be conditional on seeking work or training.',
    axisTargets: [{ axis: 'welfare', weight: -1.0 }],
    rationale: 'Conditionality to encourage work vs. unconditional support.',
    stat: 'Universal Credit includes work search requirements for many claimants.',
    sources: [
      { label: 'Department for Work and Pensions', url: 'https://www.gov.uk/universal-credit/eligibility' }
    ]
  },
  {
    id: 'welfare_9',
    text: 'Healthcare should remain free at the point of use for everyone, even if this requires higher taxation.',
    axisTargets: [{ axis: 'welfare', weight: 1.0 }],
    rationale: 'Universalism vs. tax burden/alternatives.',
    stat: 'The NHS provides tax-funded, universal coverage in the UK.',
    sources: [
      { label: 'NHS England', url: 'https://www.england.nhs.uk/' }
    ]
  },
  {
    id: 'welfare_10',
    text: 'Individuals should pay more of their own healthcare costs, even if this reduces universal coverage.',
    axisTargets: [{ axis: 'welfare', weight: -1.0 }],
    rationale: 'Private responsibility vs. universality.',
    stat: 'A minority of residents hold private health insurance in the UK.',
    sources: [
      { label: 'Private Healthcare Information Network', url: 'https://phin.org.uk/' }
    ]
  }
];

// Default to Lite version for backward compatibility
export const QUESTIONS = QUESTIONS_LITE;

// Helper functions
export const getQuestionsForAxis = (axisId: string): Question[] => {
  return QUESTIONS.filter(q => q.axisTargets.some(target => target.axis === axisId));
};

export const getQuestionById = (id: string): Question | undefined => {
  return QUESTIONS.find(q => q.id === id);
};
