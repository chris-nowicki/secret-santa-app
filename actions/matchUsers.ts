import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const matchUsers = async (eventId: string) => {
  // check to see if pairings already exists
  const { data } = await supabase
    .from('pairing')
    .select('*')
    .eq('eventId', eventId)

  // if pairings exist exit the matching function
  if (data && data.length > 0) {
    return data
  }

  // if not then create the pairings
  try {
    const { data, error } = await supabase
      .from('userStatus')
      .select('id, status, profile(id, name, email, avatar, role)')
      .eq('eventId', eventId)
      .eq('status', 'ACCEPTED')

    if (error) throw error

    if (data && data.length > 1) {
      const pairs = []

      for (let i = 0; i < data.length; i++) {
        const nextIndex = (i + 1) % data.length // Circular index
        const user = data[i]
        const pairedUser = data[nextIndex]

        pairs.push({
          eventId: eventId,
          // @ts-ignore
          santaId: user.profile.id,
          // @ts-ignore
          personId: pairedUser.profile.id,
        })
      }

      // add pairings to database
      await supabase.from('pairing').insert(pairs).select()

      // TODO: Send out emails to Secret Santa's
      // sendSecretSantaEmails(eventId)
    } else {
      console.log('Not enough users to pair')
    }
  } catch (e) {
    console.error('Error matching users:', e)
  }
}
